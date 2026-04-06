import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, Star, Zap, Lightbulb, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeveloperOS } from '@/context/developer-os-context';
import { useRecentToolsContext } from '@/context/recent-tools-context';
import { useFavorites } from '@/context/favorites-context';
import { getToolById } from '@/lib/tools';

interface SuggestionEngineProps {
  currentToolId: string;
}

export const SuggestionEngine: React.FC<SuggestionEngineProps> = ({ currentToolId }) => {
  const {
    getNextActions,
    getSuggestedWorkflows,
    getRelatedTools,
    recordAction
  } = useDeveloperOS();

  const { recentTools } = useRecentToolsContext();
  const { favorites } = useFavorites();

  const [suggestions, setSuggestions] = useState<Array<{
    id: string;
    title: string;
    description: string;
    type: 'next-action' | 'workflow' | 'related' | 'popular' | 'favorite';
  }>>([]);

  useEffect(() => {
    // Generate suggestions based on current context
    const nextActions = getNextActions(currentToolId);
    const relatedTools = getRelatedTools(currentToolId);
    const workflows = getSuggestedWorkflows(currentToolId);

    const newSuggestions = [];

    // Next actions based on current tool
    nextActions.forEach(actionId => {
      const tool = getToolById(actionId);
      if (tool) {
        newSuggestions.push({
          id: tool.id,
          title: `Continue with ${tool.name}`,
          description: `Next logical step after using ${getToolById(currentToolId)?.name}`,
          type: 'next-action'
        });
      }
    });

    // Related tools
    relatedTools.slice(0, 2).forEach(toolId => {
      const tool = getToolById(toolId);
      if (tool && !newSuggestions.some(s => s.id === tool.id)) {
        newSuggestions.push({
          id: tool.id,
          title: `Related: ${tool.name}`,
          description: `Complementary tool to ${getToolById(currentToolId)?.name}`,
          type: 'related'
        });
      }
    });

    // Recently used tools
    recentTools.slice(0, 3).forEach(tool => {
      if (!newSuggestions.some(s => s.id === tool.id) && tool.id !== currentToolId) {
        newSuggestions.push({
          id: tool.id,
          title: `Recently used: ${tool.name}`,
          description: `You used this ${Math.floor((Date.now() - tool.lastUsed) / (1000 * 60 * 60))} hours ago`,
          type: 'popular'
        });
      }
    });

    // Favorites
    favorites.slice(0, 2).forEach(tool => {
      if (!newSuggestions.some(s => s.id === tool.id) && tool.id !== currentToolId) {
        newSuggestions.push({
          id: tool.id,
          title: `Favorite: ${tool.name}`,
          description: 'Your bookmarked tool',
          type: 'favorite'
        });
      }
    });

    // Workflows
    workflows.slice(0, 2).forEach(workflowName => {
      newSuggestions.push({
        id: `workflow-${workflowName}`,
        title: `Workflow: ${workflowName}`,
        description: `Multi-step process starting from ${getToolById(currentToolId)?.name}`,
        type: 'workflow'
      });
    });

    setSuggestions(newSuggestions.slice(0, 6)); // Limit to 6 suggestions
  }, [currentToolId, getNextActions, getRelatedTools, getSuggestedWorkflows, recentTools, favorites]);

  const handleSuggestionClick = (suggestionId: string) => {
    if (suggestionId.startsWith('workflow-')) {
      // Handle workflow suggestion
      recordAction({
        toolId: currentToolId,
        type: 'transformation',
        data: { action: 'workflow_suggestion_clicked', workflow: suggestionId },
        nextPossibleActions: []
      });
    } else {
      // Handle tool suggestion
      recordAction({
        toolId: currentToolId,
        type: 'transformation',
        data: { action: 'tool_suggestion_clicked', nextTool: suggestionId },
        nextPossibleActions: []
      });
    }
  };

  if (suggestions.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'next-action': return <ArrowRight className="size-4" />;
      case 'workflow': return <Workflow className="size-4" />;
      case 'related': return <Lightbulb className="size-4" />;
      case 'popular': return <Clock className="size-4" />;
      case 'favorite': return <Star className="size-4" />;
      default: return <Zap className="size-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'next-action': return 'border-blue-500/20 bg-blue-500/5';
      case 'workflow': return 'border-purple-500/20 bg-purple-500/5';
      case 'related': return 'border-green-500/20 bg-green-500/5';
      case 'popular': return 'border-orange-500/20 bg-orange-500/5';
      case 'favorite': return 'border-yellow-500/20 bg-yellow-500/5';
      default: return 'border-primary/20 bg-primary/5';
    }
  };

  return (
    <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="size-5 text-primary" />
          <CardTitle className="text-lg">Suggestions for you</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.id}-${index}`}
              className={`p-4 rounded-lg border ${getColor(suggestion.type)} hover:border-primary/30 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer group`}
              onClick={() => handleSuggestionClick(suggestion.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary group-hover:scale-110 transition-transform">
                  {getIcon(suggestion.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {suggestion.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};