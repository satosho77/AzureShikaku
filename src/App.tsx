import './App.css'

type SummaryItem = {
  label: string
  value: string
}

type ModuleItem = {
  title: string
  url: string
}

type SectionItem = {
  title: string
  subtitle: string
  color: string
  modules: ModuleItem[]
  detail: string
}

type ResourceItem = {
  label: string
  description: string
  url: string
}

type StudyGuide = {
  title: string
  description: string
  summary: SummaryItem[]
  sections: SectionItem[]
  resources: ResourceItem[]
}

const studyGuide: StudyGuide = {
  title: 'AZ-900 Microsoft Azure Fundamentals',
  description: 'AZ-900 試験対策ガイド',
  summary: [
    { label: '試験コード', value: 'AZ-900' },
    { label: '合格点', value: '700 / 1000' },
    { label: '試験時間', value: '45分' },
    { label: '推奨学習時間', value: '10〜15時間' },
  ],
  sections: [
    {
      title: 'パート1：クラウドの概念',
      subtitle: 'Describe cloud concepts',
      color: '#7B61FF',
      modules: [
        {
          title: 'クラウド コンピューティングについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-cloud-compute/',
        },
        {
          title: 'クラウド サービスを使用する利点について説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-benefits-use-cloud-services/',
        },
        {
          title: 'クラウド サービスの種類について説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-cloud-service-types/',
        },
      ],
      detail: '試験配点 25〜30%。クラウドの基本概念、共有責任モデル、デプロイモデル、IaaS/PaaS/SaaS を学習します。',
    },
    {
      title: 'パート2：Azure のアーキテクチャとサービス',
      subtitle: 'Describe Azure architecture and services',
      color: '#09A6FF',
      modules: [
        {
          title: 'Azure のコア アーキテクチャ コンポーネントについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-core-architectural-components-of-azure/',
        },
        {
          title: 'Azure コンピューティング サービスについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-azure-compute-networking-services/',
        },
        {
          title: 'Azure ネットワーク サービスについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-azure-networking-services/',
        },
        {
          title: 'Azure ストレージ サービスについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-azure-storage-services/',
        },
        {
          title: 'Azure の ID、アクセス、セキュリティについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-azure-identity-access-security/',
        },
      ],
      detail: '試験配点 35〜40%。Azure のリージョン、可用性、コンピューティング、ネットワーク、ストレージ、セキュリティサービスを確認します。',
    },
    {
      title: 'パート3：Azure の管理とガバナンス',
      subtitle: 'Describe Azure management and governance',
      color: '#22C55E',
      modules: [
        {
          title: 'Azure でのコスト管理について説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-cost-management-azure/',
        },
        {
          title: 'Azure のガバナンスとコンプライアンス機能およびツールについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-features-tools-azure-for-governance-compliance/',
        },
        {
          title: 'Azure リソースを管理およびデプロイするための機能とツールについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-features-tools-manage-deploy-azure-resources/',
        },
        {
          title: 'Azure の監視ツールについて説明する',
          url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-monitoring-tools-azure/',
        },
      ],
      detail: '試験配点 30〜35%。ガバナンス、コスト管理、リソース管理、監視ツールの基本が学べます。',
    },
  ],
  resources: [
    {
      label: 'プラクティス評価',
      description: '無料の模擬問題で実力確認\n80%以上を目指してください',
      url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-fundamentals/practice/assessment?assessment-type=practice&assessmentId=23',
    },
    {
      label: 'サンドボックス',
      description: '試験画面のデモ体験',
      url: 'https://go.microsoft.com/fwlink/?linkid=2226877',
    },
    {
      label: '公式学習ガイド',
      description: 'Exam AZ-900 Study Guide',
      url: 'https://aka.ms/AZ900-StudyGuide',
    },
    {
      label: '認定ページ',
      description: '試験詳細と最新情報',
      url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-fundamentals/',
    },
  ],
}

function SummarySection({ summary }: { summary: SummaryItem[] }) {
  return (
    <section className="summary-card">
      <div className="summary-grid">
        {summary.map((item) => (
          <div className="summary-item" key={item.label}>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="summary-note">
        <h2>学習時間の目安</h2>
        <p>
          全体で約4時間30分の Microsoft Learn ラーニングパスをベースに、復習や模試を含めると 10〜15時間を目安にすると安心です。
        </p>
      </div>
    </section>
  )
}

function SectionsSection({ sections }: { sections: SectionItem[] }) {
  return (
    <section className="sections-panel">
      <div className="sections-scroll">
        <div className="sections-grid">
          {sections.map((section) => (
            <article className="section-card" key={section.title}>
              <div className="section-header" style={{ borderColor: section.color }}>
                <span className="section-tag" style={{ background: `${section.color}20`, color: section.color }}>
                  {section.subtitle}
                </span>
                <h2>{section.title}</h2>
              </div>
              <p className="section-detail">{section.detail}</p>
              <ul className="module-list">
                {section.modules.map((module) => (
                  <li key={module.url}>
                    <a href={module.url} target="_blank" rel="noopener noreferrer" className="module-link">
                      <span>{module.title}</span>
                      <span className="link-arrow">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResourcesSection({ resources }: { resources: ResourceItem[] }) {
  return (
    <section className="resource-panel">
      <div className="resource-header">
        <h2>追加リソース</h2>
        <p>学習を補完する公式ページと模試リンク。</p>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-card">
            <strong>{resource.label}</strong>
            <span>{resource.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <div className="background-glow" />
      <main className="page-layout">
        <section className="hero-panel">
          <div className="hero-badge">AZ-900</div>
          <h1>{studyGuide.title}</h1>
          <p className="hero-copy">{studyGuide.description}</p>
        </section>

        <SummarySection summary={studyGuide.summary} />
        <SectionsSection sections={studyGuide.sections} />
        <ResourcesSection resources={studyGuide.resources} />
      </main>
    </div>
  )
}

export default App
