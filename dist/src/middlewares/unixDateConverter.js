"use strict";
//middlewares/unixDateConverter.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangeDayUnix = getRangeDayUnix;
/**
 * Obtiene los timestamps Unix (en segundos) de inicio y fin para un día específico en UTC.
 * @param fechaInput Puede ser un string en formato 'YYYY-MM-DD' o un objeto Date.
 */
function getRangeDayUnix(dateInput) {
    const fecha = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(fecha.getTime())) {
        throw new Error("Formato de fecha inválido. Usa 'YYYY-MM-DD' o un objeto Date válido.");
    }
    const año = fecha.getUTCFullYear();
    const mes = fecha.getUTCMonth();
    const dia = fecha.getUTCDate();
    const inicioDia = new Date(Date.UTC(año, mes, dia, 0, 0, 0));
    const from = Math.floor(inicioDia.getTime() / 1000);
    const finDia = new Date(Date.UTC(año, mes, dia, 23, 59, 59));
    const to = Math.floor(finDia.getTime() / 1000);
    return { from, to };
}
//# sourceMappingURL=unixDateConverter.js.map