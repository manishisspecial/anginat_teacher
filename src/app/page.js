// app/page.js - Updated home page
import TableExample from "@/components/reusableComponents/Table/example/TableExample";

export default function Home() {
  // In development, show component examples
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
    return (
      <div className="p-6">
        {/* <ButtonExample />
        <ExamplePage />
        <Card43Example /> */}
        <TableExample />
      </div>
    );
  }

  // In production, show a simple redirect page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}


/*
OTHER EXAMPLES:

// Hide icon
<PageLayout rightContent={rightContent} showIcon={false}>
  {content}
</PageLayout>

// Custom title
<PageLayout rightContent={rightContent} customTitle="My Custom Title">
  {content}
</PageLayout>

// No header at all
<PageLayout showHeader={false}>
  {content}
</PageLayout>

// Custom icon color
<PageLayout rightContent={rightContent} customIconBgColor="#FF5722">
  {content}
</PageLayout>
*/