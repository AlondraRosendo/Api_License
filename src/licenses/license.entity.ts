export class License {
  id: string; // UUID o identificador único
  softwareName: string; // Nombre del software
  licenseKey: string; // Clave de licencia
  issuedTo: string; // Usuario o empresa
  issuedDate: Date; // Fecha de emisión
  expiryDate: Date; // Fecha de expiración
  isActive: boolean; // Estado de la licencia
}
