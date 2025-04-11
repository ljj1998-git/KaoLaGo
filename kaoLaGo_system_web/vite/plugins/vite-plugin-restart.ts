import ViteRestart from "vite-plugin-restart";

export default () => {
  return ViteRestart({
    restart: ["vite.config.[jt]s", ".env.development"],
  });
};
