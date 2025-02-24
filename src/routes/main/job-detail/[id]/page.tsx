import { jobApi } from '@/api/job'
import { useParams } from '@modern-js/runtime/router'
import { useRequest } from 'ahooks'
import { Flex, Spin } from 'antd'
import { createStyles } from 'antd-style'
import { CompanyCard } from './company-card'
import { JobCard } from './job-card'

const JobDetail = () => {
  const params = useParams()

  const { data, loading } = useRequest(async () => {
    const res = await jobApi.detail({ id: params.id as string })
    return res.data
  })

  return (
    <Spin spinning={loading}>
      <Flex gap={12}>
        <JobCard data={data} />
        <CompanyCard data={data?.company} />
      </Flex>
    </Spin>
  )
}

export default JobDetail

const useStyles = createStyles(({ token, css }) => ({
  //
}))

/**
 * 岗位职责\n1、参与大模型能力建设及大模型平台的前端功能设计和实现，提供全链路配置、中台化、内容引入，包括模型能力、数据标注/生成等业务，探索在通用业务场景的落地和实现；
2、参与平台工程技术体系建设，研发工具链打造DevOps解决方案、Node.js基础功能抽象、研发基础库和OpenAPI
等内容；
3、参与前端性能优化、稳定性建设、代码重构及可视化等工具建设，提高页面加载速度和运行效率；
4、参与前端交互和体验优化，通过组件化、流程化、配置化与搭建能力等方式支持产品运营及研发提效工作；
5、关注前端技术发展，探索和引入新技术以提升产品竞争力。
岗位要求
1、2025届获得本科及以上学历，计算机、软件工程等相关专业优先；
2、具备良好的计算机基础，掌握JavaScript、CSS、HTML等前端技术，对主流前端框架（ React、Vue、Angular等）至少一种有应用经验；
3、有兴趣深入学习前端技术开发和了解用户交互体验；
4、熟悉使用Vue/React等前端框架或者具备Web项目开发经验的同学优先；
5、积极乐观，责任心强，具备良好的沟通协作能力、逻辑思维能力以及服务意识。
 */
