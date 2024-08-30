
import '@/styles/globals.css'

// for tailwindcss
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>

        </html>
    )

}
