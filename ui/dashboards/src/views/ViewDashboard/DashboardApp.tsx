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

import { useState } from 'react';
import { Box } from '@mui/material';
import { ErrorAlert, ErrorBoundary } from '@perses-dev/components';
import { DashboardResource } from '@perses-dev/core';
import {
  PanelDrawer,
  Dashboard,
  PanelGroupDialog,
  DeletePanelGroupDialog,
  UnsavedChangesConfirmationDialog,
  DashboardToolbar,
  DeletePanelDialog,
} from '../../components';
import { useDashboard, useEditMode } from '../../context';

export interface DashboardAppProps {
  dashboardResource: DashboardResource;
  dashboardTitleComponent?: JSX.Element;
  initialVariableIsSticky?: boolean;
}

export const DashboardApp = (props: DashboardAppProps) => {
  const { dashboardResource, dashboardTitleComponent, initialVariableIsSticky } = props;
  const { setEditMode } = useEditMode();
  const { dashboard, setDashboard } = useDashboard();
  const [originalDashboard, setOriginalDashboard] = useState<DashboardResource | undefined>(undefined);
  const [isUnsavedDashboardDialogOpen, setUnsavedDashboardDialogIsOpen] = useState(false);

  const saveDashboard = async () => {
    setEditMode(false);
    setUnsavedDashboardDialogIsOpen(false);
  };

  const cancelDashboard = () => {
    // Reset to the original spec and exit edit mode
    if (originalDashboard) {
      setDashboard(originalDashboard);
    }
    setUnsavedDashboardDialogIsOpen(false);
    setEditMode(false);
  };

  const onEditButtonClick = () => {
    setEditMode(true);
    setOriginalDashboard(dashboard);
  };

  const onCancelButtonClick = () => {
    // check if dashboard has been modified
    if (JSON.stringify(dashboard) === JSON.stringify(originalDashboard)) {
      setEditMode(false);
    } else {
      setUnsavedDashboardDialogIsOpen(true);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DashboardToolbar
        dashboardName={dashboardResource.metadata.name}
        dashboardTitleComponent={dashboardTitleComponent}
        initialVariableIsSticky={initialVariableIsSticky}
        onEditButtonClick={onEditButtonClick}
        onCancelButtonClick={onCancelButtonClick}
      />
      <Box sx={{ padding: (theme) => theme.spacing(2) }}>
        <ErrorBoundary FallbackComponent={ErrorAlert}>
          <Dashboard />
        </ErrorBoundary>
        <PanelDrawer />
        <PanelGroupDialog />
        <DeletePanelGroupDialog />
        <DeletePanelDialog />
        <UnsavedChangesConfirmationDialog
          isOpen={isUnsavedDashboardDialogOpen}
          onSave={saveDashboard}
          onClose={cancelDashboard}
        />
      </Box>
    </Box>
  );
};
