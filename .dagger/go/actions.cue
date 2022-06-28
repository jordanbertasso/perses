// This file contains the different dagger actions related to go

package goplan

import (
	"dagger.io/dagger"

	"universe.dagger.io/docker"
	"universe.dagger.io/go"
)

_#goWrapper: {
	// The source code
	source: dagger.#FS
	// Custom go image
	image: docker.#Image
	// the command to execute
	cmd:       string
	container: go.#Container & {
		entrypoint: ["sh", "-c"]
		command: {
			name: cmd
		}
		"source": source
		input:    image
	}
}

#CheckLicense: _#goWrapper & {
	cmd: "make checklicense"
}

#Checkformat: _#goWrapper & {
	cmd: "make checkformat"
}

#Checkstyle: _#goWrapper & {
	cmd: "make checkstyle"
}

#GoTest: _#goWrapper & {
	cmd: "make test"
}

#CueEval: _#goWrapper & {
	cmd: "make cue-eval"
}

#CueTest: _#goWrapper & {
	cmd: "make cue-test"
}
