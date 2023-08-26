import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const getAll =
  (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
    const data = await Model.findAll();
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      resultLength: data.length,
      data,
    });
  };

export const create =
  (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newItem = req.body;
    try {
      const item = Model.build(newItem);
      await item.save();

      res.status(201).json({
        status: 'success',
        data: item,
        message: `${Model.name} created successfully`,
      });
    } catch (error: any) {
      console.log('error....', error);
      res.status(400).json({
        errorMsg: error.message,
        error: error.errors,
      });
    }
  };

export const updateOne =
  (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Model.findByPk(req.params.pk);
      if (!item) {
        return res.status(404).json({ message: `${Model.name} not Found` });
      }
      await item.update(req.body);
      return res.status(200).json({
        status: 'success',
        data: item,
        message: `${Model.name} updated successfully!!!`,
      });
    } catch (error) {
      console.error(`Error updating ${Model.name}`, error);
      return res.status(400).json({ message: `Error updating ${Model.name}` });
    }
  };
