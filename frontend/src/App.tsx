import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSpinner from "common/components/LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Routing from "routing/Routing";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider autoDismiss>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routing />
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
