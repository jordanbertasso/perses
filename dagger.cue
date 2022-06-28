// Copyright 2022 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"dagger.io/dagger"
	"dagger.io/dagger/core"
	"universe.dagger.io/docker"

	"github.com/perses/perses/.dagger/go:goplan"
)

// goplan.#Plan

dagger.#Plan & {
	actions: {
		_docker: docker.#Pull & {
			source: "quay.io/prometheus/golang-builder:1.18-base"
		}
		// Load the source code
		source: core.#Source & {
			path: "."
			exclude: [
				"*.md",
				"cue.mod",
				"ui/node_modules",
				".github",
				".idea",
			]
		}

		// checking license header in files that matters
		checklicense: goplan.#CheckLicense & {
			source: actions.source.output
			image:  _docker.output
		}

		// checking code format in go and cue files
		checkformat: goplan.#Checkformat & {
			source: actions.source.output
			image:  _docker.output
		}

		checkstyle: goplan.#Checkstyle & {
			source: actions.source.output
			image: _docker.output
		}

		// running go test
		gotest: goplan.#GoTest & {
			source: actions.source.output
			image:  _docker.output
		}

		cueEval: goplan.#CueEval & {
			source: actions.source.output
			image:  _docker.output
		}

		cueTest: goplan.#CueTest & {
			source: actions.source.output
			image:  _docker.output
		}
	}
}
