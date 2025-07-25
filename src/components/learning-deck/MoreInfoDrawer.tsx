import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Volume2, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MoreInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    notes?: string[];
    audioUrl?: string;
    videoUrl?: string;
    additionalResources?: { title: string; url: string }[];
  };
}

export const MoreInfoDrawer = ({ isOpen, onClose, title, content }: MoreInfoDrawerProps) => {
  const playAudio = () => {
    if (content.audioUrl) {
      const audio = new Audio(content.audioUrl);
      audio.play();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden"
          >
            <Card className="rounded-t-2xl border-t-2 border-accent/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">More Information</Badge>
                    <CardTitle className="text-xl">{title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Close drawer"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
                {/* Extended Notes */}
                {content.notes && content.notes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Extended Notes</h4>
                    <div className="space-y-3">
                      {content.notes.map((note, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg bg-accent-muted/30 p-4 border-l-4 border-accent/50"
                        >
                          <p className="leading-relaxed">{note}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio */}
                {content.audioUrl && (
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Audio</h4>
                    <Button
                      onClick={playAudio}
                      className="flex items-center gap-2"
                      variant="outline"
                    >
                      <Volume2 className="h-4 w-4" />
                      Play Audio
                    </Button>
                  </div>
                )}

                {/* Video */}
                {content.videoUrl && (
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Video</h4>
                    <div className="rounded-lg overflow-hidden border border-border">
                      <video
                        controls
                        className="w-full h-auto"
                        poster="/placeholder-video.jpg"
                      >
                        <source src={content.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {/* Additional Resources */}
                {content.additionalResources && content.additionalResources.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Additional Resources</h4>
                    <div className="space-y-2">
                      {content.additionalResources.map((resource, index) => (
                        <motion.a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 rounded-lg border border-border hover:bg-accent-muted/20 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 text-accent" />
                            <span className="font-medium">{resource.title}</span>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};