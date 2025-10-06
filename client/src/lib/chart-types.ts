import { TooltipProps as RechartsTooltipProps } from "recharts"

export type ChartPayload = {
  dataKey: string
  name: string
  value: number
  color?: string
  fill?: string
  payload?: {
    fill?: string
  }
}

export type ChartTooltipProps = RechartsTooltipProps<number, string> & {
  payload?: ChartPayload[]
}