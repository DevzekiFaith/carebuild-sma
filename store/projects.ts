import { create } from 'zustand';
import { Project, SiteReport } from '@/types';

interface ProjectsState {
  projects: Project[];
  reports: SiteReport[];
  selectedProject: Project | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  setReports: (reports: SiteReport[]) => void;
  setSelectedProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  addReport: (report: SiteReport) => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  reports: [],
  selectedProject: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  setReports: (reports) => set({ reports }),
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  updateProject: (projectId, updates) => set((state) => ({
    projects: state.projects.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ),
    selectedProject: state.selectedProject?.id === projectId 
      ? { ...state.selectedProject, ...updates }
      : state.selectedProject
  })),
  addReport: (report) => set((state) => ({ 
    reports: [...state.reports, report] 
  })),
  setLoading: (isLoading) => set({ isLoading }),
}));
