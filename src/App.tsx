import { useState, useRef, useLayoutEffect } from 'react'
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
  badge: string
  title: string
  description: string
  summary: SummaryItem[]
  sections: SectionItem[]
  resources: ResourceItem[]
  note?: string
}

type TabKey = 'AZ-900' | 'AZ-104' | 'AI-901' | 'AI-200'

const studyGuides: Record<TabKey, StudyGuide> = {
  'AZ-900': {
    badge: 'AZ-900',
    title: 'AZ-900 Microsoft Azure Fundamentals',
    description: 'AZ-900 試験対策ガイド',
    summary: [
      { label: '試験コード', value: 'AZ-900' },
      { label: '合格点', value: '700 / 1000' },
      { label: '試験時間', value: '45分' },
      { label: '推奨学習時間', value: '10〜15時間' },
    ],
    note:
      'Microsoft Learn の 3 つのラーニングパスをベースに、復習や模試を含めると 10〜15時間を目安にすると安心です。',
    sections: [
      {
        title: 'パート1：クラウドの概念について説明する',
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
        title: 'パート2：Azure のアーキテクチャとサービスについて説明する',
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
        detail: '試験配点 35〜40%。Azure の物理インフラ、コンピューティング、ネットワーク、ストレージ、ID、セキュリティサービスを確認します。',
      },
      {
        title: 'パート3：Azure の管理とガバナンスについて説明する',
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
        detail: '試験配点 30〜35%。Azure のコスト管理、ガバナンス、リソース管理、監視ツールの基礎を学びます。',
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
  },
  'AZ-104': {
    badge: 'AZ-104',
    title: 'AZ-104 Microsoft Azure Administrator',
    description: 'AZ-104 試験対策ガイド',
    summary: [
      { label: '試験コード', value: 'AZ-104' },
      { label: '合格点', value: '700 / 1000' },
      { label: '試験時間', value: '100分' },
      { label: '推奨学習時間', value: '25〜35時間' },
    ],
    note:
      'Microsoft Learn の 5 つのラーニングパスをベースに、ハンズオン演習と復習を含めて 25〜35時間を目安にしてください。実務経験が浅い場合はさらに時間を確保するのが安心です。',
    sections: [
      {
        title: 'パート0：前提条件（任意）',
        subtitle: 'Prerequisites for Azure administrators',
        color: '#6366F1',
        modules: [
          {
            title: 'Azure Cloud Shellの概要',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/intro-to-azure-cloud-shell/',
          },
          {
            title: 'JSON ARMテンプレートを使用したAzureインフラのデプロイ',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/create-azure-resource-manager-template-vs-code/',
          },
        ],
        detail: 'AZ-900 の基礎に加え、Azure Cloud Shell と ARM テンプレート/Bicep の前提知識を確認します。',
      },
      {
        title: 'パート1：Azure の ID とガバナンスを管理する',
        subtitle: 'Manage identities and governance',
        color: '#2563EB',
        modules: [
          {
            title: 'Microsoft Entra IDについて理解する',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/understand-azure-active-directory/',
          },
          {
            title: 'IDの作成、構成、管理',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/create-configure-manage-identities/',
          },
          {
            title: 'Azureのコアアーキテクチャコンポーネントについて説明する',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/describe-core-architectural-components-of-azure/',
          },
          {
            title: 'Azure Policyイニシアチブ',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/sovereignty-policy-initiatives/',
          },
          {
            title: 'Azure RBACでAzureリソースを保護する',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/secure-azure-resources-with-rbac/',
          },
          {
            title: 'Microsoft Entraセルフサービスパスワードリセットでユーザーにパスワードをリセットさせる',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/allow-users-reset-their-password/',
          },
        ],
        detail: 'Microsoft Entra ID、RBAC、Azure Policy、管理グループ、コスト管理など、ID とガバナンスの運用基盤を学びます。',
      },
      {
        title: 'パート2：ストレージを実装および管理する',
        subtitle: 'Implement and manage storage',
        color: '#10B981',
        modules: [
          {
            title: 'ストレージアカウントの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-storage-accounts/',
          },
          {
            title: 'Azure Blob Storageの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-blob-storage/',
          },
          {
            title: 'Azure Storageセキュリティの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-storage-security/',
          },
          {
            title: 'Azure Filesの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-azure-files-file-sync/',
          },
        ],
        detail: 'ストレージアカウント、Blob、ファイル共有、セキュリティ、SAS やアクセスキーの管理などを整理します。',
      },
      {
        title: 'パート3：Azure のコンピューティングリソースをデプロイおよび管理する',
        subtitle: 'Deploy and manage Azure compute resources',
        color: '#0EA5E9',
        modules: [
          {
            title: 'Azure仮想マシンの概要',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/intro-to-azure-virtual-machines/',
          },
          {
            title: '仮想マシンの可用性の構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-virtual-machine-availability/',
          },
          {
            title: 'Azure App Serviceプランの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-app-service-plans/',
          },
          {
            title: 'Azure App Serviceの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-azure-app-services/',
          },
          {
            title: 'Azure Container Instancesの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-azure-container-instances/',
          },
        ],
        detail: '仮想マシン、App Service、コンテナを含む Azure コンピューティング基盤を構築・管理する力を養います。',
      },
      {
        title: 'パート4：仮想ネットワークを実装および管理する',
        subtitle: 'Implement and manage virtual networking',
        color: '#7C3AED',
        modules: [
          {
            title: '仮想ネットワークの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-virtual-networks/',
          },
          {
            title: 'ネットワークセキュリティグループの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-network-security-groups/',
          },
          {
            title: 'Azure DNSでドメインをホストする',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/host-domain-azure-dns/',
          },
          {
            title: 'Azure 仮想ネットワーク ピアリングの構成',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/configure-vnet-peering/',
          },
          {
            title: 'ルートによるAzureデプロイのトラフィックフロー管理',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/control-network-traffic-flow-with-routes/',
          },
          {
            title: 'Azure Load Balancerの概要',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/intro-to-azure-load-balancer/',
          },
          {
            title: 'Azure Application Gatewayの概要',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/intro-to-azure-application-gateway/',
          },
          {
            title: 'Azure Network Watcherの概要',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/intro-to-azure-network-watcher/',
          },
        ],
        detail: 'VNet、NSG、DNS、ピアリング、ロードバランサーなどの仮想ネットワーク設計と実装をカバーします。',
      },
      {
        title: 'パート5：Azure リソースを監視および保守する',
        subtitle: 'Monitor and maintain Azure resources',
        color: '#14B8A6',
        modules: [
          {
            title: 'Azure Backupの概要',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/intro-to-azure-backup/',
          },
          {
            title: 'Azure Backupを使用した仮想マシンの保護',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/protect-virtual-machines-with-azure-backup/',
          },
          {
            title: 'Azure Monitorを使用したAzure仮想マシンの監視',
            url: 'https://learn.microsoft.com/ja-jp/training/modules/monitor-azure-vm-using-diagnostic-data/',
          },
        ],
        detail: 'Azure Monitor、バックアップ、復旧の基本を押さえて、運用監視と保守の流れを学びます。',
      },
    ],
    resources: [
      {
        label: 'プラクティス評価',
        description: 'AZ-104 の模擬問題で理解度を確認',
        url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-administrator/practice/assessment?assessment-type=practice&assessmentId=21',
      },
      {
        label: '試験サンドボックス',
        description: '試験画面の雰囲気を体験',
        url: 'https://go.microsoft.com/fwlink/?linkid=2226877',
      },
      {
        label: '公式学習ガイド',
        description: 'AZ-104 試験学習ガイド',
        url: 'https://aka.ms/AZ104-StudyGuide',
      },
      {
        label: '認定ページ',
        description: '試験の最新情報と登録方法',
        url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-administrator/',
      },
    ],
  },
  'AI-901': {
    badge: 'AI-901',
    title: 'AI-901 Microsoft Azure AI Fundamentals',
    description: 'AI-901 試験対策ガイド',
    summary: [
      { label: '試験コード', value: 'AI-901' },
      { label: '合格点', value: '700 / 1000' },
      { label: '試験時間', value: '45分' },
      { label: '推奨学習時間', value: '6〜10時間' },
    ],
    note:
      '基礎概念中心の試験です。公式モジュールと短いハンズオンで 6〜10時間を目安に学習してください。',
    sections: [
      {
        title: 'パート1：AI の基礎概念',
        subtitle: 'Understand AI fundamentals',
        color: '#8B5CF6',
        modules: [
          {
            title: 'Azure での AI の概要を学ぶ',
            url: 'https://learn.microsoft.com/ja-jp/training/courses/ai-901t00',
          },
          {
            title: '機械学習と生成 AI の基本を理解する',
            url: 'https://learn.microsoft.com/ja-jp/azure/ai-foundry/',
          },
          {
            title: '責任ある AI の考え方を確認する',
            url: 'https://learn.microsoft.com/ja-jp/azure/machine-learning/concept-responsible-ai',
          },
        ],
        detail: 'AI の概念、機械学習、生成 AI、責任ある AI の考え方をざっくり確認します。',
      },
      {
        title: 'パート2：Azure AI サービス',
        subtitle: 'Explore Azure AI services',
        color: '#EC4899',
        modules: [
          {
            title: 'Azure AI サービスの全体像を把握する',
            url: 'https://learn.microsoft.com/ja-jp/azure/ai-services/',
          },
          {
            title: 'Azure AI Search の活用イメージを理解する',
            url: 'https://learn.microsoft.com/ja-jp/azure/search/search-what-is-azure-search',
          },
          {
            title: 'コンピューター ビジョンと NLP の用途を確認する',
            url: 'https://learn.microsoft.com/ja-jp/azure/ai-services/computer-vision/overview',
          },
        ],
        detail: 'Azure AI サービス、コンピューター ビジョン、自然言語処理、検索の基礎を整理します。',
      },
      {
        title: 'パート3：試験対策のポイント',
        subtitle: 'Prepare for the exam',
        color: '#F59E0B',
        modules: [
          {
            title: 'AI-901 の公式試験ページを確認する',
            url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/exams/ai-901/',
          },
          {
            title: 'AI-901 スタディ ガイドを読む',
            url: 'https://aka.ms/AI901-StudyGuide',
          },
          {
            title: 'Azure AI の基礎認定ページを見直す',
            url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-ai-fundamentals/',
          },
        ],
        detail: '試験の出題観点と公式リソースを押さえて、短時間で効率よく復習できる形にまとめます。',
      },
    ],
    resources: [
      {
        label: '試験ページ',
        description: 'AI-901 の公式情報と出題範囲',
        url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/exams/ai-901/',
      },
      {
        label: '学習ガイド',
        description: 'AI-901 スタディ ガイド',
        url: 'https://aka.ms/AI901-StudyGuide',
      },
      {
        label: '認定ページ',
        description: 'Azure AI の基礎認定の詳細',
        url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-ai-fundamentals/',
      },
      {
        label: 'サンドボックス',
        description: '試験画面の雰囲気を体験',
        url: 'https://go.microsoft.com/fwlink/?linkid=2226877',
      },
    ],
  },
  'AI-200': {
    badge: 'AI-200',
    title: 'AI-200 Azure AI Cloud Developer',
    description: 'AI-200 試験対策ガイド',
    summary: [
      { label: '試験コード', value: 'AI-200' },
      { label: '合格点', value: '700 / 1000' },
      { label: '試験時間', value: '120分' },
      { label: '推奨学習時間', value: '10〜15時間' },
    ],
    note:
      '実装中心の試験のため、ハンズオンやコード演習を多めに行ってください。ドキュメント確認と実装演習を含め 12〜20時間を推奨します。',
    sections: [
      {
        title: 'パート1：Azure AI サービスの実装',
        subtitle: 'Build AI solutions on Azure',
        color: '#0F766E',
        modules: [
          {
            title: 'Azure AI Services の概要を把握する',
            url: 'https://learn.microsoft.com/ja-jp/azure/ai-services/',
          },
          {
            title: 'Azure OpenAI を使ったアプリ開発を確認する',
            url: 'https://learn.microsoft.com/ja-jp/azure/ai-foundry/openai/overview',
          },
          {
            title: 'Azure AI Search を使った検索機能を学ぶ',
            url: 'https://learn.microsoft.com/ja-jp/azure/search/search-what-is-azure-search',
          },
        ],
        detail: 'Azure AI Services、Azure OpenAI、Azure AI Search を使った実装パターンを把握します。',
      },
      {
        title: 'パート2：開発・接続・セキュリティ',
        subtitle: 'Develop, connect, and secure solutions',
        color: '#3B82F6',
        modules: [
          {
            title: 'Azure SDK とサービス接続の基本を学ぶ',
            url: 'https://learn.microsoft.com/ja-jp/azure/developer/',
          },
          {
            title: 'Azure での認証とセキュリティを確認する',
            url: 'https://learn.microsoft.com/ja-jp/azure/active-directory/develop/overview',
          },
          {
            title: '監視とトラブルシューティングの流れを学ぶ',
            url: 'https://learn.microsoft.com/ja-jp/azure/azure-monitor/overview',
          },
        ],
        detail: 'AI ソリューションの開発、Azure サービス接続、認証、監視とトラブルシューティングを整理します。',
      },
      {
        title: 'パート3：試験準備の要点',
        subtitle: 'Focus on exam readiness',
        color: '#6366F1',
        modules: [
          {
            title: 'AI-200 の公式認定ページを確認する',
            url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-ai-cloud-developer-associate/',
          },
          {
            title: 'AI-200 学習ガイドを読む',
            url: 'https://aka.ms/AI200-StudyGuide',
          },
          {
            title: '試験サンドボックスで体験を確認する',
            url: 'https://go.microsoft.com/fwlink/?linkid=2226877',
          },
        ],
        detail: '実装中心の試験なので、公式ガイドとサンドボックスで試験形式と要点を確認するのが効果的です。',
      },
    ],
    resources: [
      {
        label: '認定ページ',
        description: 'AI-200 の公式情報と試験概要',
        url: 'https://learn.microsoft.com/ja-jp/credentials/certifications/azure-ai-cloud-developer-associate/',
      },
      {
        label: '学習ガイド',
        description: 'AI-200 スタディ ガイド',
        url: 'https://aka.ms/AI200-StudyGuide',
      },
      {
        label: 'Azure AI Services',
        description: 'Azure AI サービスの概要',
        url: 'https://learn.microsoft.com/ja-jp/azure/ai-services/',
      },
      {
        label: 'Azure OpenAI',
        description: 'Azure OpenAI の開始ガイド',
        url: 'https://learn.microsoft.com/ja-jp/azure/ai-foundry/openai/overview',
      },
    ],
  },
}

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'AZ-900', label: 'AZ-900' },
  { key: 'AZ-104', label: 'AZ-104' },
  { key: 'AI-901', label: 'AI-901' },
  { key: 'AI-200', label: 'AI-200' },
]

function SummarySection({ summary, note }: { summary: SummaryItem[]; note?: string }) {
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
        <p>{note ?? '公式のラーニングパスをベースに、復習や模試を含めた学習時間を見積もってください。'}</p>
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

function ExamTabs({ activeTab, onChange }: { activeTab: TabKey; onChange: (tab: TabKey) => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null)

  const updateIndicator = () => {
    const container = containerRef.current
    if (!container) return
    const activeIndex = tabs.findIndex((t) => t.key === activeTab)
    const btn = btnRefs.current[activeIndex]
    if (!btn) return
    const containerRect = container.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const left = btnRect.left - containerRect.left + container.scrollLeft
    const width = btnRect.width
    setIndicatorStyle({ left, width })
  }

  useLayoutEffect(() => {
    updateIndicator()
    const activeIndex = tabs.findIndex((t) => t.key === activeTab)
    const btn = btnRefs.current[activeIndex]
    if (btn) {
      btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
    }
    const onResize = () => updateIndicator()
    const onScroll = () => updateIndicator()
    window.addEventListener('resize', onResize)
    const container = containerRef.current
    container?.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('resize', onResize)
      container?.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  return (
    <div className="segmented-control" role="tablist" aria-label="試験一覧" ref={containerRef}>
      <div
        className="segmented-indicator"
        aria-hidden="true"
        style={indicatorStyle ? { left: indicatorStyle.left + 'px', width: indicatorStyle.width + 'px' } : { opacity: 0 }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab.key}
          ref={(el) => { btnRefs.current[i] = el }}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.key}
          className={`segmented-button ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          <span className="segmented-label">{tab.label}</span>
          <span className="segmented-sub">{tab.key === 'AZ-900' ? 'Fundamentals' : tab.key === 'AZ-104' ? 'Admin' : tab.key === 'AI-901' ? 'AI Basics' : 'AI Dev'}</span>
        </button>
      ))}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('AZ-900')
  const activeGuide = studyGuides[activeTab]

  return (
    <div className="app-shell">
      <div className="background-glow" />
      <main className="page-layout">
        <div className="top-shell">
          <ExamTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <section className="hero-panel">
          <div className="hero-badge">{activeGuide.badge}</div>
          <h1>{activeGuide.title}</h1>
          <p className="hero-copy">{activeGuide.description}</p>
        </section>

        <SummarySection summary={activeGuide.summary} note={activeGuide.note} />
        <SectionsSection sections={activeGuide.sections} />
        <ResourcesSection resources={activeGuide.resources} />
      </main>
    </div>
  )
}

export default App
