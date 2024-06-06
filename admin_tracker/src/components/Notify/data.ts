export interface ListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "primary" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin Vite Está en línea",
    datetime: "hace un año",
    description:
      "Una solución básica gratuita y de código abierto para sistemas de gestión de middle y back office, basada en tecnologías convencionales como Vue3, TypeScript, Element Plus, Pinia y Vite"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin Está en línea",
    datetime: "Hace dos años",
    description: "View3、TypeScript、Element Plus Pinia"
  }
]

export const messageData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "Del mundo de Truman",
    description: "Si no puedo volver a verte, te deseo buenos días, buenas tardes y buenas noches",
    datetime: "1998-06-05"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "De Viaje al Oeste",
    description: "Si tuviera que ponerle una fecha límite a este amor, me gustaría que fueran 10.000 años",
    datetime: "1995-02-04"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "De mi vecino Totoro",
    description: "Con buenas intenciones, seguramente te encontrarás con ángeles",
    datetime: "1988-04-16"
  }
]

export const todoData: ListItem[] = [
  {
    title: "El nombre de la tarea",
    description: "El tipo era perezoso y no dejaba nada",
    extra: "No empezó",
    status: "info"
  },
  {
    title: "El nombre de la tarea",
    description: "El tipo era perezoso y no dejaba nada",
    extra: "Actual",
    status: "primary"
  },
  {
    title: "El nombre de la tarea",
    description: "El tipo era perezoso y no dejaba nada",
    extra: "Se agotó el tiempo de espera",
    status: "danger"
  }
]
