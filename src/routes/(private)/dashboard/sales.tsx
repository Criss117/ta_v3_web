import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/dashboard/sales')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/sales"!</div>
}
