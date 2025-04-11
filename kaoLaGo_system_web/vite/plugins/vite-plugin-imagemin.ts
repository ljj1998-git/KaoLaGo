import viteImagemin from "vite-plugin-imagemin";

export default () => {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7, // 设置 gif 压缩级别
    },
    optipng: {
      optimizationLevel: 7, // 设置 png 压缩级别
    },
    mozjpeg: {
      quality: 75, // 设置 jpg 压缩质量
    },
    pngquant: {
      quality: [0.65, 0.8], // 设置 png 压缩质量范围
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: "removeViewBox",
          active: false,
        },
        {
          name: "removeEmptyAttrs",
          active: false,
        },
      ],
    },
  });
};
