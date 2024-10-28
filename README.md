# RSSchool NodeJS websocket task template

> Static http server and base task packages.
> By default WebSocket client tries to connect to the 3000 port.

## Installation

1. Clone/download repo
2. `npm install`

## Usage

`npm run start` - START HTTP and WS

1. Start http by npm run start and start WS by npm run start:ws

**Development**
| `npm run start:ws` | Start websocket with watcher |

`npm run start:dev`

- App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`
START ALL 2 server without nodemon

---

**All commands**

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run start:dev` | App served @ `http://localhost:8181` with nodemon |
| `npm run start`     | START HTTP and WS                                 |

| `npm run start:ws` | Start websocket with watcher `http://localhost:3000` |

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
