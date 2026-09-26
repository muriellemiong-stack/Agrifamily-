import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Agrifamily UI Error Boundary caught an error:', error, errorInfo);
  }

  public handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 text-neutral-900 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-neutral-200 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <AlertCircle className="h-8 w-8" />
            </div>
            
            <h2 className="text-xl font-extrabold text-neutral-900">
              Agrifamily - Récupération de Session
            </h2>
            
            <p className="text-sm text-neutral-600 leading-relaxed">
              Une anomalie passagère a été détectée et automatiquement isolée pour protéger vos données de récoltes.
            </p>

            {this.state.error?.message && (
              <div className="rounded-xl bg-neutral-100 p-3 text-xs text-neutral-600 font-mono text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Réessayer</span>
              </button>
              
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Actualiser la page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
