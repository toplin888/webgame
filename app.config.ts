export default defineAppConfig({
    ui: {
        // 注册 lucky 作为可用颜色
        colors: {
            lucky: 'purple',
            transparent: 'transparent',
        },

        // 可选：设置 lucky 为默认 primary 颜色
        // primary: 'lucky',

        // 可选：设置按钮默认使用 lucky 颜色
        button: {
            // default: {
            //     color: 'lucky',
            //     variant: 'solid'
            // }
            slots: {
                base: 'font-normal',
            }
        },
        app: {
            toaster: false
        }
    },
    app: {
        name: 'LuckyX Frontend',
        version: '1.0.0',
        description: 'A multilingual web application',

        // 品牌配置
        brand: {
            primaryColor: '#7578FF',
            logo: '/logo.svg',
            favicon: '/favicon.ico'
        },

        // 布局配置
        layout: {
            maxWidth: '1112px',
            navbar: {
                height: '64px',
                background: 'black'
            }
        },

        // API 配置（如果需要）
        api: {
            baseUrl: process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'
                : 'https://api.luckyx.com'
        }

    }
})