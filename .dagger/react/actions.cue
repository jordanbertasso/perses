package reactplan

import (
	"dagger.io/dagger"
	"universe.dagger.io/docker"
)

_#reactWrapper: {
	// The source code
	source: dagger.#FS
	// Custom react image
	image: docker.#Image
	// the command to execute
	command: [...string]
	container: _#container & {
		entrypoint: command
		"source":   source
		input:      image
	}
}

#ReactLint: _#reactWrapper & {
	command: ["make", "ui-lint"]
}
