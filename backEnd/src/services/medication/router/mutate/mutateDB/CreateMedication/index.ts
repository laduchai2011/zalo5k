import sql from 'mssql';
import { MutateDB } from '@src/services/medication/interface';
import { MedicationField, CreateMedicationBodyField } from '@src/dataStruct/medication';

class MutateDB_CreateMedication extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _createMedicationOption: CreateMedicationBodyField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_createMedicationBody(createMedicationBody: CreateMedicationBodyField): void {
        this._createMedicationOption = createMedicationBody;
    }

    async run(): Promise<sql.IProcedureResult<MedicationField> | undefined> {
        if (this._connectionPool !== undefined && this._createMedicationOption !== undefined) {
            try {
                // ===== TẠO TVP (Table-Valued Parameter) =====
                const images = this._createMedicationOption.images;
                const tvpImage = new sql.Table('MedicationImageType');
                tvpImage.columns.add('url', sql.NVarChar(255));
                for (const img of images) {
                    tvpImage.rows.add(img.url);
                }
                const videos = this._createMedicationOption.videos;
                const tvpVideo = new sql.Table('MedicationVideoType');
                tvpVideo.columns.add('url', sql.NVarChar(255));
                for (const video of videos) {
                    tvpVideo.rows.add(video.url);
                }

                const result = await this._connectionPool
                    .request()
                    .input('title', sql.NVarChar(255), this._createMedicationOption.medication.title)
                    .input('type', sql.NVarChar(255), this._createMedicationOption.medication.type)
                    .input('typeGroup', sql.NVarChar(255), this._createMedicationOption.medication.typeGroup)
                    .input('information', sql.NVarChar(sql.MAX), this._createMedicationOption.medication.information)
                    .input('averageRating', sql.Float, this._createMedicationOption.medication.averageRating)
                    .input('rateCount', sql.Int, this._createMedicationOption.medication.rateCount)
                    .input('amount', sql.Int, this._createMedicationOption.medication.amount)
                    .input('discount', sql.Float, this._createMedicationOption.medication.discount)
                    .input('price', sql.Float, this._createMedicationOption.medication.price)
                    .input('userId', sql.Int, this._createMedicationOption.medication.userId)
                    .input('medicationImage', tvpImage)
                    .input('medicationVideo', tvpVideo)
                    .execute('CreateMedication');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_CreateMedication;
