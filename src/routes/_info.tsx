import { createFileRoute,Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_info')({
  component: LayoutComponent,
})

function LayoutComponent() {
  console.log('LayoutComponent')

  return (
    <div>
      <h1>Layout!!!!</h1>
      <Outlet />
    </div>
  )
}
