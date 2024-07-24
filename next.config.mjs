import _withTM from 'next-transpile-modules'
import _withRoutes from 'nextjs-routes/config'

const withTM = _withTM(['antd', '@ant-design/icons'])
const withRoutes = _withRoutes()

const nextConfig = {
  reactStrictMode: true,
}

export default withTM(withRoutes(nextConfig))
