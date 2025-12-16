import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@repo/ui-core/button'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">
          A fully featured React
          <br />
          components library
        </h1>
        <p className="text-lg text-gray-7 dark:text-dark-1">
          Build fully functional accessible web applications faster than ever -
          Mantine includes more than 120 customizable components and 70 hooks to
          cover you in any situation
        </p>
        <div className="flex items-center gap-2">
          <Button appName="loki-form">Get started</Button>
          <Button appName="loki-form">GitHub</Button>
        </div>
      </div>
    </div>
  )
}
