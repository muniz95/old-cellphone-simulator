import { CallRecord } from '@/interfaces/callRecord';
import db from '../utils/db';

export const insertCallRecord = (callRecord: CallRecord) => {
  db.insert<CallRecord>('callRecords', callRecord);
};

const service = {
  insertCallRecord,
};

export default service;
