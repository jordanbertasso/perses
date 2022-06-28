package reactplan

import (
	"dagger.io/dagger"
	"universe.dagger.io/docker"
)

// A standalone react environment to run react command
_#container: {
	// Container app name
	name: *"react_builder" | string

	// Source code
	source: dagger.#FS

	_sourcePath: "/src"

	docker.#Run & {
		input:   docker.#Image
		workdir: _sourcePath
		mounts: {
			"source": {
				dest:     _sourcePath
				contents: source
			}
		}
	}
}
