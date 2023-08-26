import { create, getAll } from './handlerFactory';
import Medication from '../models/medication';

export const getMedications = getAll(Medication);

export const createMedication = create(Medication);
