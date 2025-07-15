'use client'
// components/layout/PageLayout.jsx
import PageHeader from './PageHeader'

export default function PageLayout({
    children,
    rightContent,
    customTitle,
    customIcon,
    customBreadcrumbs,
    showIcon = true,
    showHeader = true,
    customIconBgColor,
    customPadding
}) {
    // Use customPadding if provided, otherwise default to 'p-6'
    const paddingClass = customPadding || 'p-6'
    
    return (
        <>
            {showHeader && (
                <PageHeader
                    customTitle={customTitle}
                    customIcon={customIcon}
                    customBreadcrumbs={customBreadcrumbs}
                    rightContent={rightContent}
                    showIcon={showIcon}
                    customIconBgColor={customIconBgColor}
                />
            )}
            <main className={`min-h-screen bg-gray-50 ${paddingClass}`}>
                {children}
            </main>
        </>
    )
}