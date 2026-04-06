import React, { useEffect, useState } from 'react';
import { Send, ArrowUpRight, Database, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeveloperOS } from '@/context/developer-os-context';
import { getToolById } from '@/lib/tools';

interface DataFlowEngineProps {
  currentToolId: string;
  currentData: any;
  onDataTransfer?: (targetToolId: string, data: any) => void;
}

export const DataFlowEngine: React.FC<DataFlowEngineProps> = ({
  currentToolId,
  currentData,
  onDataTransfer
}) => {
  const { workspaceData, getRelatedTools, updateWorkspaceData } = useDeveloperOS();
  const [connectedTools, setConnectedTools] = useState<string[]>([]);
  const [transferOptions, setTransferOptions] = useState<Array<{
    id: string;
    name: string;
    compatible: boolean;
  }>>([]);

  useEffect(() => {
    const related = getRelatedTools(currentToolId);
    setConnectedTools(related);

    // Determine which tools can accept current data type
    const options = related.map(toolId => {
      const tool = getToolById(toolId);
      return {
        id: toolId,
        name: tool?.name || toolId,
        compatible: true // Simplified compatibility check
      };
    });

    setTransferOptions(options);
  }, [currentToolId, getRelatedTools]);

  const handleDataTransfer = (targetToolId: string) => {
    if (onDataTransfer) {
      onDataTransfer(targetToolId, currentData);
    }

    // Store data in workspace for target tool
    updateWorkspaceData(targetToolId, currentData);
  };

  if (transferOptions.length === 0) return null;

  return (
    <Card className="mt-6 border-dashed border-2 border-primary/20 bg-primary/5 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="size-5 text-primary" />
            <CardTitle className="text-lg">Connect Tools</CardTitle>
          </div>
          <Button variant="ghost" size="sm">
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Transfer your current data to connected tools
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {transferOptions.map(option => (
              <Button
                key={option.id}
                variant="outline"
                className="h-auto py-3 px-4 justify-start text-left flex items-start gap-3 hover:bg-primary/10 border-primary/20"
                onClick={() => handleDataTransfer(option.id)}
              >
                <div className="mt-0.5">
                  <Send className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{option.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {option.compatible ? 'Ready to receive data' : 'Incompatible format'}
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};