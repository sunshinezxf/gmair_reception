export const QRCODE_CHANGE = "QRCODE_CHANGE"

export function changeQrcode(qrcode) {
    return {
        type:QRCODE_CHANGE,
        qrcode:qrcode
    }
}
