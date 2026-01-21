# CrudVentory


## REQUERIMIENTOS `/back`
- npm: `v10.9.2`
- node.js: `v22.17.0`
- json-server: `v1.0.0-beta.3`

##### Instalación npm & node.js
- **npm & node.js**: `sudo apt install nodejs npm`
- **versiones**: `node.js -> node -v  | npm -> npm -v`

##### Instalación Json-Server
`npm install json-server`
    **o**
`npm i json-server`

- **versión**: `json-server -> json-server --version`
---
## Ejecutar el back `db.json`
#### Ejecutar db.json con Json-server
**1.** Ingresar a la carpeta:
```
    /back/
```
**2.** Dentro de la carpeta ejecutar en siguinente comando en la terminar:
```
    json-server bd.json
```
**o**
```
    npx json-server db.json
```
---
## Estructura del db.json
JSON - SERVER
**1. Configuración general** (`config`) → nombre, logo, contacto, redes sociales.
**2. Usuarios** (`users`) → administración y empleados.
**3. Categorías y productos** (`categories y products`) → para el catálogo.
**4. Ventas** (`sales`) → historial de compras y gestión de pedidos.
**5. Landing page** (`landing_page`) → hero, banners, características, testimonios, newsletter.
**6. Dashboard** (`dashboard`) → estadísticas, ventas recientes, alertas de stock.

---