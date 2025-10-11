import { PageHeader } from '@/app/components/shared/page-header'
import { KnowledgeGrid } from '@/app/components/shared/knowledge/knowledge-grid'

export default function KnowledgePage() {
    return (
        <div className="container p-12 md:p-12 mt-28">
            <PageHeader
                title="Indigenous Knowledge"
                description="Explore Botswana's rich heritage of traditional knowledge, from medicinal plants to cultural expressions."
            />
            <KnowledgeGrid />
        </div>
    )
}
