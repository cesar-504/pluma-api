# pluma-api

## Rutas

### /api/administrators (rest)
Lista de administradores
- UserId: number

### /api/cost_parkings (rest)
Lista de costos para los estacionamientos
- hoursIni: number
- hoursEnd: number
- priceForHour: number
- priceForRange: number
- usePriceForRange: boolean
- ParkingId: number
### /api/entries (rest)
Lista de entradas para los estacionamientos
- name: string 
- open: boolean
- ParkingId: number

### /api/ios (get,/:id)
Registro de entradas y salidas de los estacionamientos
- typeIO: string
- EntryId: number
- UserId: number

### /api/parkings (rest)
- name: string
- capacity: number
- currentlyOccupied: number
- requireID: boolean
- open: boolean

### /api/users (rest)
- name: string
- lastName: string
- email: string
- credit: number
- password: string
- active: boolean
- currentLocationId: number [null]

### /api/parkings/access (post)  , /api/entries/access (post) 
### /api/parkings/exit (post)  , /api/entries/exit (post) 
Da acceso o salida  a un estacionamiento.
Cuando se quiere entrar el parametro action debe ser 'access'
Cuando se quiere salir el parametro action debe ser 'exit'

Parametros:
- idEntry: number;
- idUser: number;
- action: string;

Retorno:
- idEntry: number;
- auth: boolean;
- userId?: number;
- ioId?: number;
- error?: string;



Todas las rutas marcadas como rest tienen las sigientes rutas:
- ruta    [get] devuelve todos los registros.
- ruta/:id     [get] devuelve un registro por id.
- ruta    [post] crea un registro.
- ruta/:id    [put] edita un registro por id.
- ruta/:id    [del] elimina un registro por id.

