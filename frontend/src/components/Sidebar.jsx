import React from 'react';
import './Sidebar.css';

export default function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onOpenSettings,
  isLoading,
  onAbort
}) {
  
  const handleAbortClick = (e) => {
    e.stopPropagation();
    onAbort();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">LLM Council Plus</div>
        <div className="sidebar-actions-header">
          <button 
            className="icon-button" 
            onClick={onNewConversation}
            disabled={isLoading}
            title="New Council"
          >
            +
          </button>
          <button 
            className="icon-button" 
            onClick={onOpenSettings}
            title="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Prominent New Council Button */}
      <div className="sidebar-actions">
        <button
          className="new-council-btn"
          onClick={onNewConversation}
          disabled={isLoading}
        >
          <span className="btn-icon">+</span>
          <span className="btn-text">New Council</span>
        </button>
      </div>

      <div className="conversation-list">
        {conversations.length === 0 ? (
          <div className="sidebar-empty-state">No history</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${conv.id === currentConversationId ? 'active' : ''}`}
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="conversation-title">
                {conv.title || 'New Conversation'}
              </div>
              <div className="conversation-meta">
                <span>{new Date(conv.created_at).toLocaleDateString()}</span>
                {isLoading && conv.id === currentConversationId ? (
                  <button className="stop-generation-btn small" onClick={handleAbortClick}>
                    Stop
                  </button>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                    title="Delete conversation"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
