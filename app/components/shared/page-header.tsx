interface PageHeaderProps {
    title: string
    description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {title}
            </h1>
            {description && (
                <p className="mt-4 text-lg text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    )
}
