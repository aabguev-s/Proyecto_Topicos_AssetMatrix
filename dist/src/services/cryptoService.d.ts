import { ICrypto } from '../models/Crypto';
export declare class CryptoService {
    private cryptoRepository;
    createCrypto(data: Partial<ICrypto>): Promise<ICrypto>;
    getAllCryptos(): Promise<ICrypto[]>;
    getCryptoById(id: string): Promise<ICrypto>;
    updateCrypto(id: string, data: Partial<ICrypto>): Promise<ICrypto>;
    deleteCrypto(id: string): Promise<void>;
}
//# sourceMappingURL=cryptoService.d.ts.map