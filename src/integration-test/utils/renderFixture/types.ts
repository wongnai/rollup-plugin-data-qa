import { InjectDataQaParams } from 'types'

export type SnapshotTarget = 'firstChild' | 'children'

export type RenderFixtureParams = {
	category: string
	fileName: string
	params?: InjectDataQaParams
	snapshotTarget?: SnapshotTarget
}
