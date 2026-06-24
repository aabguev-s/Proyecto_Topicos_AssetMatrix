import { ICrypto } from '../models/Crypto';
export declare class CryptoRepository {
    create(data: Partial<ICrypto>): Promise<ICrypto>;
    findAll(): Promise<ICrypto[]>;
    findById(id: string): Promise<ICrypto | null>;
    update(id: string, data: Partial<ICrypto>): Promise<ICrypto | null>;
    delete(id: string): Promise<ICrypto | null>;
}
//# sourceMappingURL=cryptoRepository.d.ts.map