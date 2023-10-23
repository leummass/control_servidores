export class Catalogo_Servidor {
    constructor(
        public ID: number,
        public IdServidor: number,
        public IpServidor:string,
        public Nombre: string,
        public Tipo: string,
        public Status:string,
        public Descripcion: string,
        
        public FechaModificacion: string,
        public NoColaborador: string,
    ) { }
}