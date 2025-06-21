import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/dashboard/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/dashboard/analytics"!</div>
}
