import { ICrypto, ICryptoTransaction } from '../models/Crypto';
export declare class CryptoRepository {
    create(data: Partial<ICrypto>): Promise<ICrypto>;
    findAll(): Promise<ICrypto[]>;
    findById(id: string): Promise<ICrypto | null>;
    update(id: string, data: Partial<ICrypto>): Promise<ICrypto | null>;
    delete(id: string): Promise<ICrypto | null>;
    findAllTransactions(): Promise<ICryptoTransaction[]>;
    findByIdNameOrSymbol(identifier: string): Promise<ICrypto | null>;
    pushTransaction(id: string, newTransaction: ICryptoTransaction): Promise<ICrypto | null>;
}
//# sourceMappingURL=cryptoRepository.d.ts.map