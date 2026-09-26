import React, { useState } from 'react';
import { Users, ThumbsUp, MessageSquare, Send, Sparkles, MapPin, Tag } from 'lucide-react';
import { CommunityComment, Language, User } from '../types';
import { translations } from '../data/translations';

interface CommunityFeedProps {
  comments: CommunityComment[];
  currentUser: User | null;
  onAddComment: (comment: CommunityComment) => void;
  onLikeComment: (commentId: string) => void;
  onOpenAuth: () => void;
  language: Language;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  comments,
  currentUser,
  onAddComment,
  onLikeComment,
  onOpenAuth,
  language
}) => {
  const t = translations[language];
  const [newCommentText, setNewCommentText] = useState('');
  const [topic, setTopic] = useState<'conservation' | 'marche' | 'recolte' | 'general'>('conservation');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const newComment: CommunityComment = {
      id: `comm_${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorLocation: currentUser.location,
      contentFr: newCommentText.trim(),
      contentEn: newCommentText.trim(),
      timestamp: language === 'fr' ? 'À l’instant' : 'Just now',
      likes: 0,
      topic: topic
    };

    onAddComment(newComment);
    setNewCommentText('');
  };

  const filteredComments = selectedFilter === 'all'
    ? comments
    : comments.filter(c => c.topic === selectedFilter);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Users className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            {t.communityTitle}
          </h2>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          {t.communitySubtitle}
        </p>
      </div>

      {/* Post comment card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
        <h3 className="font-bold text-neutral-900 text-sm mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <span>{t.shareTipOrReview}</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            rows={3}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={t.commentPlaceholder}
            className="w-full rounded-2xl bg-neutral-50 border border-neutral-200 p-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-neutral-500 font-semibold">{language === 'fr' ? 'Thématique :' : 'Topic:'}</span>
              <select
                value={topic}
                onChange={(e: any) => setTopic(e.target.value)}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-800 focus:outline-none"
              >
                <option value="conservation">{language === 'fr' ? 'Conservation & Zéro Perte' : 'Preservation & Zero-Waste'}</option>
                <option value="marche">{language === 'fr' ? 'Cours des marchés & Prix' : 'Market Prices & Logistics'}</option>
                <option value="recolte">{language === 'fr' ? 'Techniques de récolte' : 'Harvesting methods'}</option>
                <option value="general">{language === 'fr' ? 'Avis général' : 'General'}</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{t.postCommentBtn}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', labelFr: 'Tous les échanges', labelEn: 'All Posts' },
          { id: 'conservation', labelFr: 'Conservation & Stockage', labelEn: 'Preservation Tips' },
          { id: 'marche', labelFr: 'Cours & Tendances Marché', labelEn: 'Market Trends' },
          { id: 'recolte', labelFr: 'Techniques Récoltes', labelEn: 'Harvest Techniques' }
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === f.id
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {language === 'fr' ? f.labelFr : f.labelEn}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
                  {comment.authorName.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-neutral-900 text-sm">
                      {comment.authorName}
                    </h4>
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-700">
                      {comment.authorRole === 'producer' ? t.producerBadge : t.buyerBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                    <MapPin className="h-3 w-3 text-neutral-400" />
                    <span>{comment.authorLocation}</span>
                    <span>·</span>
                    <span>{comment.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Topic tag */}
              <span className="hidden sm:inline-block rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-200/60">
                {comment.topic === 'conservation' ? '🛡️ Zéro-Perte' : '📊 Marché'}
              </span>

            </div>

            {/* Comment Body */}
            <p className="mt-4 text-xs sm:text-sm text-neutral-800 leading-relaxed">
              {language === 'fr' ? comment.contentFr : comment.contentEn}
            </p>

            {/* Actions: Likes */}
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => onLikeComment(comment.id)}
                className="flex items-center gap-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1 text-xs font-semibold text-neutral-700 transition-colors"
              >
                <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
                <span>{t.likeBtn} ({comment.likes})</span>
              </button>

              <span className="text-[11px] text-neutral-400">
                Agrifamily Espace Partagé
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
