export type LessonScriptSegment = {
  id: number;
  voiceover: {
    text: string;
    postGapMs?: number;
  };
  visual?: {
    sceneType?: string;
    sceneContent?: string;
    assetRef?: string | null;
    assetRef2?: string | null;
    playbackRate?: number;
    component?: string;
    markdown?: string;
    json?: Record<string, unknown>;
  };
};

const normalizeAssetRef = (value?: string | null) => {
  if (!value) return null;
  const cleaned = String(value).trim();
  if (!cleaned) return null;
  if (/^(none|n\/a|null)$/i.test(cleaned)) return null;
  return cleaned;
};

const getFieldValue = (line: string, label: string) => {
  const regex = new RegExp(`^${label}\\s*:\\s*(.+)$`, 'i');
  const match = regex.exec(line);
  return match ? match[1].trim() : null;
};

export const parseScriptMd = (markdown: string): LessonScriptSegment[] => {
  const lines = String(markdown ?? '').split(/\r?\n/);

  const segments: LessonScriptSegment[] = [];
  let current: LessonScriptSegment | null = null;
  let fence: {lang: string; buffer: string[]} | null = null;
  let mode: 'voiceover' | null = null;

  const flush = () => {
    if (!current) return;
    if (current.voiceover?.text) {
      current.voiceover.text = String(current.voiceover.text).replace(/\s+/g, ' ').trim();
    }
    segments.push(current);
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    const segmentMatch = /^##\s+Segment\s+(\d+)/i.exec(trimmed);
    if (segmentMatch && !fence) {
      flush();
      current = {
        id: Number(segmentMatch[1]),
        voiceover: {text: ''},
        visual: {},
      };
      mode = null;
      continue;
    }

    if (!current) continue;

    if (fence) {
      if (/^```/.test(trimmed)) {
        const content = fence.buffer.join('\n').trim();
        if (fence.lang === 'markdown') {
          current.visual = current.visual ?? {};
          current.visual.markdown = content;
        } else if (fence.lang === 'json') {
          current.visual = current.visual ?? {};
          try {
            current.visual.json = JSON.parse(content) as Record<string, unknown>;
          } catch {
            current.visual.json = undefined;
          }
        }
        fence = null;
      } else {
        fence.buffer.push(rawLine);
      }
      continue;
    }

    const fenceMatch = /^```(\w+)?/.exec(trimmed);
    if (fenceMatch) {
      fence = {lang: (fenceMatch[1] ?? '').toLowerCase(), buffer: []};
      continue;
    }

    if (!trimmed) {
      if (mode === 'voiceover') {
        current.voiceover.text += '\n';
      }
      continue;
    }

    const voiceoverMarker = /^(voiceover|narration)\s*:\s*$/i.test(trimmed);
    if (voiceoverMarker) {
      mode = 'voiceover';
      continue;
    }

    const postGapValue =
      getFieldValue(trimmed, 'Post Gap Ms') ?? getFieldValue(trimmed, 'PostGapMs');
    if (postGapValue) {
      const num = Number(postGapValue);
      if (Number.isFinite(num)) current.voiceover.postGapMs = num;
      continue;
    }

    const typeValue =
      getFieldValue(trimmed, 'Scene Type') ??
      getFieldValue(trimmed, 'Visual Type') ??
      getFieldValue(trimmed, 'Type');
    if (typeValue) {
      current.visual = current.visual ?? {};
      current.visual.sceneType = typeValue;
      continue;
    }

    const contentValue =
      getFieldValue(trimmed, 'Scene Content') ??
      getFieldValue(trimmed, 'Visual Notes') ??
      getFieldValue(trimmed, 'Content');
    if (contentValue) {
      current.visual = current.visual ?? {};
      current.visual.sceneContent = contentValue;
      continue;
    }

    const assetValue =
      getFieldValue(trimmed, 'Asset Ref') ?? getFieldValue(trimmed, 'Asset');
    if (assetValue) {
      current.visual = current.visual ?? {};
      current.visual.assetRef = normalizeAssetRef(assetValue);
      continue;
    }

    const assetValue2 =
      getFieldValue(trimmed, 'Asset Ref 2') ?? getFieldValue(trimmed, 'Asset 2');
    if (assetValue2) {
      current.visual = current.visual ?? {};
      current.visual.assetRef2 = normalizeAssetRef(assetValue2);
      continue;
    }

    const rateValue =
      getFieldValue(trimmed, 'Playback Rate') ?? getFieldValue(trimmed, 'Speed');
    if (rateValue) {
      const num = Number(rateValue);
      if (Number.isFinite(num) && num > 0) {
        current.visual = current.visual ?? {};
        current.visual.playbackRate = num;
      }
      continue;
    }

    const componentValue = getFieldValue(trimmed, 'Component');
    if (componentValue) {
      current.visual = current.visual ?? {};
      current.visual.component = componentValue.trim();
      continue;
    }

    // Default: if voiceover mode is on, accumulate text.
    if (mode === 'voiceover') {
      current.voiceover.text +=
        (current.voiceover.text && !current.voiceover.text.endsWith('\n') ? ' ' : '') + trimmed;
      continue;
    }
  }

  flush();

  // Clean up empty visual objects.
  return segments.map((seg) => {
    const visual = seg.visual ?? {};
    const hasVisual = Object.values(visual).some(
      (v) => v !== undefined && v !== null && String(v).trim() !== '',
    );
    return {
      id: Number(seg.id),
      voiceover: seg.voiceover ?? {text: ''},
      ...(hasVisual ? {visual} : {}),
    };
  });
};

