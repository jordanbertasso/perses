package reactplan

import (
	"github.com/perses/perses/.dagger/common:commonplan"
)

Actions: commonplan.Actions & {
	reactlint: #ReactLint & {
		source: Actions.source.output
		image:  Actions.docker.output
	}
}
