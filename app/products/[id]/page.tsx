'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Minus,
  Pause,
  Play,
  PlayCircle,
  Plus,
  VolumeX
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import ContentViewer from '@/components/ContentViewer';
import TwoPaneLayout from '@/components/layout/TwoPaneLayout';
import MediaFrame from '@/components/layout/MediaFrame';
import { getProductById, type ProductDetailResponse } from '@/lib/api';

type CourseContentItem = {
  id: string;
  title: string;
  url: string;
  hlsUrl?: string;
  fallbackVideoUrl?: string;
  type: 'Reading' | 'Video' | 'Image';
  description?: string;
  meta: string;
  sectionId: string;
};

type CourseSection = {
  id: string;
  label: string;
  name: string;
  items: CourseContentItem[];
};

const isUrl = (value?: string) =>
  typeof value === 'string' && /^https?:\/\//i.test(value.trim());

const normalizeString = (value: unknown) =>
  typeof value === 'string' ? value : undefined;

const trimToNonEmptyString = (value: unknown) => {
  const normalized = normalizeString(value)?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
};

const pathTail = (value: unknown) => {
  const normalized = trimToNonEmptyString(value);
  if (!normalized) return undefined;
  const segments = normalized.split('/').filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : undefined;
};

const normalizePreviewUrl = (value: string | null) => {
  if (typeof value !== 'string') return null;
  let current = value.trim();
  if (!current) return null;
  if (isUrl(current)) return current;

  for (let i = 0; i < 2; i += 1) {
    try {
      current = decodeURIComponent(current);
      if (isUrl(current)) return current;
    } catch {
      break;
    }
  }

  return null;
};

const normalizeUrlForComparison = (value?: string | null) => {
  if (typeof value !== 'string') return null;
  let current = value.trim();
  if (!current) return null;
  for (let i = 0; i < 2; i += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) break;
      current = decoded;
    } catch {
      break;
    }
  }
  return current;
};

const isImageUrl = (value?: string) =>
  typeof value === 'string' && /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif)(\?|$)/i.test(value.toLowerCase());

const resolveContentType = (rawType?: string, url?: string): 'Reading' | 'Video' | 'Image' => {
  const type = typeof rawType === 'string' ? rawType.toLowerCase() : '';
  const normalizedUrl = typeof url === 'string' ? url.toLowerCase() : '';
  if (type.includes('image') || isImageUrl(normalizedUrl)) {
    return 'Image';
  }
  if (
    type.includes('video') ||
    /\.mp4($|\?)/i.test(normalizedUrl) ||
    /\.m3u8($|\?)/i.test(normalizedUrl)
  ) {
    return 'Video';
  }
  return 'Reading';
};

const firstValidUrl = (...values: Array<string | undefined>) =>
  values.find((value) => isUrl(value));

const isM3u8Url = (value?: string) =>
  typeof value === 'string' && /\.m3u8($|\?)/i.test(value);

const readOptionalString = (record: Record<string, unknown> | undefined, key: string) => {
  const value = record?.[key];
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
};

const pickPreferredContentUrl = ({
  rawType,
  fileOriginal,
  fileMp4,
  fileM3u8,
  topLevelOriginal,
  bodyUrl
}: {
  rawType?: string;
  fileOriginal?: string;
  fileMp4?: string;
  fileM3u8?: string;
  topLevelOriginal?: string;
  bodyUrl?: string;
}) => {
  const hintedType = resolveContentType(rawType, firstValidUrl(fileM3u8, fileMp4, fileOriginal, topLevelOriginal, bodyUrl));
  if (hintedType === 'Video') {
    return firstValidUrl(fileM3u8, fileMp4, fileOriginal, topLevelOriginal, bodyUrl);
  }
  return firstValidUrl(topLevelOriginal, fileOriginal, fileMp4, fileM3u8, bodyUrl);
};

const normalizeSectionName = (value?: string, fallback = 'Content') => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const stripHtml = (value?: string) => {
  if (typeof value !== 'string' || value.length === 0) return '';
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const ResetViewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M13 21.9998C12.3834 21.9998 11.779 21.9371 11.187 21.8118C10.595 21.6865 10.016 21.5075 9.45005 21.2748C9.10005 21.1248 8.90438 20.8748 8.86305 20.5248C8.82172 20.1748 8.94238 19.8581 9.22505 19.5748C9.34172 19.4581 9.49172 19.3831 9.67505 19.3498C9.85838 19.3165 10.0334 19.3415 10.2 19.4248C10.6334 19.6248 11.0877 19.7708 11.563 19.8628C12.0384 19.9548 12.5174 20.0005 13 19.9998C14.95 19.9998 16.6044 19.3205 17.963 17.9618C19.3217 16.6031 20.0007 14.9491 20 12.9998C20 11.0498 19.3207 9.39547 17.962 8.0368C16.6034 6.67814 14.9494 5.99914 13 5.9998H12.85L13.725 6.8748C13.9084 7.05814 14 7.29147 14 7.5748C14 7.85814 13.9084 8.09147 13.725 8.2748C13.525 8.4748 13.2834 8.5748 13 8.5748C12.7167 8.5748 12.4834 8.4748 12.3 8.2748L9.70005 5.6998C9.61672 5.5998 9.55005 5.49147 9.50005 5.3748C9.45005 5.25814 9.42505 5.13314 9.42505 4.9998C9.42505 4.86647 9.45005 4.73714 9.50005 4.6118C9.55005 4.48647 9.61672 4.38247 9.70005 4.2998L12.3 1.6998C12.4834 1.51647 12.7167 1.4248 13 1.4248C13.2834 1.4248 13.525 1.51647 13.725 1.6998C13.9084 1.8998 14 2.14147 14 2.4248C14 2.70814 13.9084 2.94147 13.725 3.1248L12.85 3.9998H13C14.25 3.9998 15.421 4.23747 16.513 4.7128C17.605 5.18814 18.555 5.8298 19.3631 6.6378C20.1711 7.44581 20.8127 8.3958 21.288 9.4878C21.7634 10.5798 22.0007 11.7505 22 12.9998C22 15.4998 21.125 17.6248 19.375 19.3748C17.625 21.1248 15.5 21.9998 13 21.9998ZM7.00005 18.5748C6.86672 18.5748 6.74172 18.5538 6.62505 18.5118C6.50838 18.4698 6.40005 18.3991 6.30005 18.2998L1.70005 13.6998C1.60005 13.5998 1.52938 13.4915 1.48805 13.3748C1.44672 13.2581 1.42572 13.1331 1.42505 12.9998C1.42505 12.8665 1.44605 12.7415 1.48805 12.6248C1.53005 12.5081 1.60072 12.3998 1.70005 12.2998L6.30005 7.6998C6.40005 7.5998 6.50838 7.5288 6.62505 7.4868C6.74172 7.44481 6.86672 7.42414 7.00005 7.4248C7.13338 7.4248 7.25838 7.4458 7.37505 7.4878C7.49172 7.5298 7.60005 7.60047 7.70005 7.6998L12.3 12.2998C12.4 12.3998 12.471 12.5081 12.513 12.6248C12.555 12.7415 12.5757 12.8665 12.575 12.9998C12.575 13.1331 12.5544 13.2581 12.513 13.3748C12.4717 13.4915 12.4007 13.5998 12.3 13.6998L7.70005 18.2998C7.60005 18.3998 7.49172 18.4708 7.37505 18.5128C7.25838 18.5548 7.13338 18.5755 7.00005 18.5748ZM7.00005 16.1498L10.15 12.9998L7.00005 9.8498L3.85005 12.9998L7.00005 16.1498Z"
      fill="white"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M16.59 9H15V4C15 3.45 14.55 3 14 3H10C9.45 3 9 3.45 9 4V9H7.41C6.52 9 6.07 10.08 6.7 10.71L11.29 15.3C11.68 15.69 12.31 15.69 12.7 15.3L17.29 10.71C17.92 10.08 17.48 9 16.59 9ZM5 19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19C19 18.45 18.55 18 18 18H6C5.45 18 5 18.45 5 19Z"
      fill="white"
    />
  </svg>
);

const PrintIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M19 8H5C3.34 8 2 9.34 2 11V15C2 16.1 2.9 17 4 17H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V17H20C21.1 17 22 16.1 22 15V11C22 9.34 20.66 8 19 8ZM15 19H9C8.45 19 8 18.55 8 18V14H16V18C16 18.55 15.55 19 15 19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM17 3H7C6.45 3 6 3.45 6 4V6C6 6.55 6.45 7 7 7H17C17.55 7 18 6.55 18 6V4C18 3.45 17.55 3 17 3Z"
      fill="white"
    />
  </svg>
);

const DotsVerticalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="5" r="2" fill="white" />
    <circle cx="12" cy="12" r="2" fill="white" />
    <circle cx="12" cy="19" r="2" fill="white" />
  </svg>
);

const VideoPlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6.5585 17.7337C5.90016 17.7337 5.27516 17.5754 4.72516 17.2587C3.42516 16.5087 2.7085 14.9837 2.7085 12.9754V7.03373C2.7085 5.01706 3.42516 3.5004 4.72516 2.7504C6.02516 2.0004 7.70016 2.14206 9.45016 3.1504L14.5918 6.11706C16.3335 7.1254 17.3002 8.50873 17.3002 10.0087C17.3002 11.5087 16.3418 12.8921 14.5918 13.9004L9.45016 16.8671C8.44183 17.4421 7.4585 17.7337 6.5585 17.7337ZM6.5585 3.51706C6.1085 3.51706 5.7085 3.61706 5.35016 3.8254C4.45016 4.34206 3.9585 5.48373 3.9585 7.03373V12.9671C3.9585 14.5171 4.45016 15.6504 5.35016 16.1754C6.25016 16.7004 7.4835 16.5504 8.82516 15.7754L13.9668 12.8087C15.3085 12.0337 16.0502 11.0421 16.0502 10.0004C16.0502 8.95873 15.3085 7.96706 13.9668 7.19206L8.82516 4.2254C8.0085 3.75873 7.24183 3.51706 6.5585 3.51706Z"
      fill="white"
    />
  </svg>
);

const VideoVolumeHighIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10.4582 17.1579C9.79984 17.1579 9.07484 16.9245 8.34984 16.4662L5.9165 14.9412C5.74984 14.8412 5.55817 14.7829 5.3665 14.7829H4.1665C2.14984 14.7829 1.0415 13.6745 1.0415 11.6579V8.32452C1.0415 6.30785 2.14984 5.19952 4.1665 5.19952H5.35817C5.54984 5.19952 5.7415 5.14119 5.90817 5.04119L8.3415 3.51618C9.55817 2.75785 10.7415 2.61618 11.6748 3.13285C12.6082 3.64952 13.1165 4.72452 13.1165 6.16618V13.8079C13.1165 15.2412 12.5998 16.3245 11.6748 16.8412C11.3082 17.0578 10.8915 17.1579 10.4582 17.1579ZM4.1665 6.45785C2.84984 6.45785 2.2915 7.01618 2.2915 8.33285V11.6662C2.2915 12.9829 2.84984 13.5412 4.1665 13.5412H5.35817C5.7915 13.5412 6.20817 13.6579 6.57484 13.8912L9.00817 15.4162C9.80817 15.9162 10.5665 16.0495 11.0748 15.7662C11.5832 15.4829 11.8748 14.7745 11.8748 13.8329V6.17452C11.8748 5.22452 11.5832 4.51619 11.0748 4.24119C10.5665 3.95785 9.80817 4.08285 9.00817 4.59119L6.5665 6.10785C6.20817 6.34118 5.78317 6.45785 5.35817 6.45785H4.1665Z"
      fill="white"
    />
    <path
      d="M15.0002 13.9589C14.8669 13.9589 14.7419 13.9172 14.6252 13.8339C14.3502 13.6256 14.2919 13.2339 14.5002 12.9589C15.8086 11.2172 15.8086 8.78389 14.5002 7.04222C14.2919 6.76722 14.3502 6.37555 14.6252 6.16722C14.9002 5.95889 15.2919 6.01722 15.5002 6.29222C17.1336 8.47555 17.1336 11.5256 15.5002 13.7089C15.3752 13.8756 15.1919 13.9589 15.0002 13.9589Z"
      fill="white"
    />
    <path
      d="M16.5251 16.0416C16.3918 16.0416 16.2668 15.9999 16.1501 15.9166C15.8751 15.7082 15.8168 15.3166 16.0251 15.0416C18.2501 12.0749 18.2501 7.9249 16.0251 4.95823C15.8168 4.68323 15.8751 4.29157 16.1501 4.08324C16.4251 3.8749 16.8168 3.93324 17.0251 4.20824C19.5835 7.61657 19.5835 12.3832 17.0251 15.7916C16.9085 15.9582 16.7168 16.0416 16.5251 16.0416Z"
      fill="white"
    />
  </svg>
);

const VideoBack10Icon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M7.94946 13.8914C7.6078 13.8914 7.32446 13.608 7.32446 13.2664V10.4414L7.16613 10.6247C6.9328 10.883 6.54113 10.8997 6.2828 10.6747C6.02446 10.4414 6.0078 10.0497 6.2328 9.79137L7.4828 8.3997C7.6578 8.20803 7.9328 8.14137 8.17446 8.23303C8.41613 8.3247 8.57446 8.55803 8.57446 8.81637V13.2747C8.57446 13.6164 8.29946 13.8914 7.94946 13.8914Z"
      fill="white"
    />
    <path
      d="M10.0001 2.89978C9.93343 2.89978 9.86676 2.90811 9.8001 2.90811L10.4834 2.05811C10.7001 1.79145 10.6584 1.39145 10.3834 1.18311C10.1168 0.966448 9.7251 1.00811 9.50843 1.28311L7.86676 3.33311C7.85843 3.34145 7.85843 3.34978 7.8501 3.36645C7.8251 3.39978 7.80843 3.44145 7.79176 3.47478C7.7751 3.51645 7.75843 3.54978 7.7501 3.58311C7.74176 3.62478 7.74176 3.65811 7.74176 3.69978C7.74176 3.74145 7.74176 3.78311 7.74176 3.82478C7.74176 3.84145 7.74176 3.84978 7.74176 3.86645C7.7501 3.89145 7.76676 3.90811 7.7751 3.94145C7.79176 3.98311 7.8001 4.01645 7.8251 4.04978C7.8501 4.08311 7.8751 4.11645 7.90843 4.14978C7.9251 4.16645 7.94176 4.19145 7.95843 4.20811C7.96676 4.21645 7.98343 4.21645 7.99176 4.22478C8.01676 4.24145 8.04176 4.25811 8.0751 4.26645C8.11676 4.29145 8.15843 4.30811 8.2001 4.31645C8.23343 4.33311 8.25843 4.33311 8.29176 4.33311C8.31676 4.33311 8.33343 4.34145 8.35843 4.34145C8.3751 4.34145 8.4001 4.33311 8.41676 4.32478C8.44176 4.32478 8.46676 4.32478 8.5001 4.32478C9.03343 4.19978 9.53343 4.14145 10.0084 4.14145C13.7501 4.14145 16.7918 7.18311 16.7918 10.9248C16.7918 14.6664 13.7501 17.7081 10.0084 17.7081C6.26676 17.7081 3.2251 14.6664 3.2251 10.9248C3.2251 9.47478 3.7001 8.07478 4.6001 6.87478C4.80843 6.59978 4.7501 6.20811 4.4751 5.99978C4.2001 5.79145 3.80843 5.84978 3.6001 6.12478C2.53343 7.54145 1.9751 9.19978 1.9751 10.9248C1.9751 15.3498 5.5751 18.9581 10.0084 18.9581C14.4418 18.9581 18.0418 15.3581 18.0418 10.9248C18.0418 6.49145 14.4251 2.89978 10.0001 2.89978Z"
      fill="white"
    />
    <path
      d="M11.6667 13.8919C10.4 13.8919 9.375 12.8669 9.375 11.6003V10.4753C9.375 9.20859 10.4 8.18359 11.6667 8.18359C12.9333 8.18359 13.9583 9.20859 13.9583 10.4753V11.6003C13.9583 12.8669 12.9333 13.8919 11.6667 13.8919ZM11.6667 9.44193C11.0917 9.44193 10.625 9.90859 10.625 10.4836V11.6086C10.625 12.1836 11.0917 12.6503 11.6667 12.6503C12.2417 12.6503 12.7083 12.1836 12.7083 11.6086V10.4836C12.7083 9.90859 12.2417 9.44193 11.6667 9.44193Z"
      fill="white"
    />
  </svg>
);

const VideoForward10Icon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M16.408 6.12504C16.1997 5.85004 15.808 5.79171 15.533 6.00004C15.258 6.20838 15.1997 6.60004 15.408 6.87504C16.308 8.07504 16.783 9.47504 16.783 10.925C16.783 14.6667 13.7413 17.7084 9.99967 17.7084C6.25801 17.7084 3.21634 14.6667 3.21634 10.925C3.21634 7.18338 6.25801 4.15004 9.99967 4.15004C10.483 4.15004 10.9747 4.20838 11.508 4.33338C11.533 4.34171 11.558 4.33338 11.5913 4.33338C11.608 4.33338 11.633 4.35004 11.6497 4.35004C11.6747 4.35004 11.6913 4.34171 11.7163 4.34171C11.7497 4.34171 11.7747 4.33338 11.7997 4.32504C11.8413 4.31671 11.883 4.30004 11.9247 4.27504C11.9497 4.25838 11.983 4.25004 12.008 4.23338C12.0163 4.22504 12.033 4.22504 12.0413 4.21671C12.0663 4.20004 12.0747 4.17504 12.0913 4.15838C12.1247 4.12504 12.1497 4.10004 12.1747 4.05838C12.1997 4.02504 12.208 3.98338 12.2247 3.95004C12.233 3.92504 12.2497 3.90004 12.258 3.87504C12.258 3.85838 12.258 3.85004 12.258 3.83338C12.2663 3.79171 12.2663 3.75004 12.258 3.70838C12.258 3.66671 12.258 3.63338 12.2497 3.59171C12.2413 3.55838 12.2247 3.52504 12.208 3.48338C12.1913 3.44171 12.1747 3.40004 12.1497 3.36671C12.1413 3.35004 12.1413 3.34171 12.133 3.33338L10.483 1.27504C10.2663 1.00838 9.87467 0.966711 9.60801 1.17504C9.34134 1.39171 9.29967 1.78338 9.50801 2.05004L10.1913 2.90004C10.1247 2.90004 10.058 2.89171 9.99134 2.89171C5.56634 2.89171 1.95801 6.49171 1.95801 10.925C1.95801 15.3584 5.55801 18.9584 9.99134 18.9584C14.4247 18.9584 18.0247 15.3584 18.0247 10.925C18.033 9.20004 17.4663 7.54171 16.408 6.12504Z"
      fill="white"
    />
    <path
      d="M7.94946 13.8914C7.6078 13.8914 7.32446 13.608 7.32446 13.2664V10.4414L7.16613 10.6247C6.9328 10.883 6.54113 10.8997 6.2828 10.6747C6.02446 10.4414 6.0078 10.0497 6.2328 9.79137L7.4828 8.3997C7.6578 8.20803 7.9328 8.14137 8.17446 8.23303C8.41613 8.3247 8.57446 8.55803 8.57446 8.81637V13.2747C8.57446 13.6164 8.29946 13.8914 7.94946 13.8914Z"
      fill="white"
    />
    <path
      d="M11.6667 13.8919C10.4 13.8919 9.375 12.8669 9.375 11.6003V10.4753C9.375 9.20859 10.4 8.18359 11.6667 8.18359C12.9333 8.18359 13.9583 9.20859 13.9583 10.4753V11.6003C13.9583 12.8669 12.9333 13.8919 11.6667 13.8919ZM11.6667 9.44193C11.0917 9.44193 10.625 9.90859 10.625 10.4836V11.6086C10.625 12.1836 11.0917 12.6503 11.6667 12.6503C12.2417 12.6503 12.7083 12.1836 12.7083 11.6086V10.4836C12.7083 9.90859 12.2417 9.44193 11.6667 9.44193Z"
      fill="white"
    />
  </svg>
);

const VideoSettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 13.125C8.275 13.125 6.875 11.725 6.875 10C6.875 8.275 8.275 6.875 10 6.875C11.725 6.875 13.125 8.275 13.125 10C13.125 11.725 11.725 13.125 10 13.125ZM10 8.125C8.96667 8.125 8.125 8.96667 8.125 10C8.125 11.0333 8.96667 11.875 10 11.875C11.0333 11.875 11.875 11.0333 11.875 10C11.875 8.96667 11.0333 8.125 10 8.125Z"
      fill="white"
    />
    <path
      d="M12.6748 18.4922C12.4998 18.4922 12.3248 18.4672 12.1498 18.4256C11.6332 18.2839 11.1998 17.9589 10.9248 17.5006L10.8248 17.3339C10.3332 16.4839 9.65817 16.4839 9.1665 17.3339L9.07484 17.4922C8.79984 17.9589 8.3665 18.2922 7.84984 18.4256C7.32484 18.5672 6.78317 18.4922 6.32484 18.2172L4.8915 17.3922C4.38317 17.1006 4.0165 16.6256 3.85817 16.0506C3.70817 15.4756 3.78317 14.8839 4.07484 14.3756C4.3165 13.9506 4.38317 13.5672 4.2415 13.3256C4.09984 13.0839 3.7415 12.9422 3.24984 12.9422C2.03317 12.9422 1.0415 11.9506 1.0415 10.7339V9.26723C1.0415 8.05056 2.03317 7.0589 3.24984 7.0589C3.7415 7.0589 4.09984 6.91723 4.2415 6.67556C4.38317 6.4339 4.32484 6.05056 4.07484 5.62556C3.78317 5.11723 3.70817 4.51723 3.85817 3.95056C4.00817 3.37556 4.37484 2.90056 4.8915 2.6089L6.33317 1.7839C7.27484 1.22556 8.5165 1.55056 9.08317 2.5089L9.18317 2.67556C9.67484 3.52556 10.3498 3.52556 10.8415 2.67556L10.9332 2.51723C11.4998 1.55056 12.7415 1.22556 13.6915 1.79223L15.1248 2.61723C15.6332 2.9089 15.9998 3.3839 16.1582 3.9589C16.3082 4.5339 16.2332 5.12556 15.9415 5.6339C15.6998 6.0589 15.6332 6.44223 15.7748 6.6839C15.9165 6.92556 16.2748 7.06723 16.7665 7.06723C17.9832 7.06723 18.9748 8.0589 18.9748 9.27556V10.7422C18.9748 11.9589 17.9832 12.9506 16.7665 12.9506C16.2748 12.9506 15.9165 13.0922 15.7748 13.3339C15.6332 13.5756 15.6915 13.9589 15.9415 14.3839C16.2332 14.8922 16.3165 15.4922 16.1582 16.0589C16.0082 16.6339 15.6415 17.1089 15.1248 17.4006L13.6832 18.2256C13.3665 18.4006 13.0248 18.4922 12.6748 18.4922ZM9.99984 15.4089C10.7415 15.4089 11.4332 15.8756 11.9082 16.7006L11.9998 16.8589C12.0998 17.0339 12.2665 17.1589 12.4665 17.2089C12.6665 17.2589 12.8665 17.2339 13.0332 17.1339L14.4748 16.3006C14.6915 16.1756 14.8582 15.9672 14.9248 15.7172C14.9915 15.4672 14.9582 15.2089 14.8332 14.9922C14.3582 14.1756 14.2998 13.3339 14.6665 12.6922C15.0332 12.0506 15.7915 11.6839 16.7415 11.6839C17.2748 11.6839 17.6998 11.2589 17.6998 10.7256V9.2589C17.6998 8.7339 17.2748 8.30056 16.7415 8.30056C15.7915 8.30056 15.0332 7.9339 14.6665 7.29223C14.2998 6.65056 14.3582 5.8089 14.8332 4.99223C14.9582 4.77556 14.9915 4.51723 14.9248 4.26723C14.8582 4.01723 14.6998 3.81723 14.4832 3.6839L13.0415 2.8589C12.6832 2.64223 12.2082 2.76723 11.9915 3.1339L11.8998 3.29223C11.4248 4.11723 10.7332 4.5839 9.9915 4.5839C9.24984 4.5839 8.55817 4.11723 8.08317 3.29223L7.9915 3.12556C7.78317 2.77556 7.3165 2.65056 6.95817 2.8589L5.5165 3.69223C5.29984 3.81723 5.13317 4.02556 5.0665 4.27556C4.99984 4.52556 5.03317 4.7839 5.15817 5.00056C5.63317 5.81723 5.6915 6.6589 5.32484 7.30056C4.95817 7.94223 4.19984 8.3089 3.24984 8.3089C2.7165 8.3089 2.2915 8.7339 2.2915 9.26723V10.7339C2.2915 11.2589 2.7165 11.6922 3.24984 11.6922C4.19984 11.6922 4.95817 12.0589 5.32484 12.7006C5.6915 13.3422 5.63317 14.1839 5.15817 15.0006C5.03317 15.2172 4.99984 15.4756 5.0665 15.7256C5.13317 15.9756 5.2915 16.1756 5.50817 16.3089L6.94984 17.1339C7.12484 17.2422 7.33317 17.2672 7.52484 17.2172C7.72484 17.1672 7.8915 17.0339 7.99984 16.8589L8.0915 16.7006C8.5665 15.8839 9.25817 15.4089 9.99984 15.4089Z"
      fill="white"
    />
  </svg>
);

const getRelativeTime = (value?: string) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const diffMs = Math.max(now.getTime() - date.getTime(), 0);
  const day = 24 * 60 * 60 * 1000;
  const month = 30 * day;
  if (diffMs >= month) {
    const months = Math.max(1, Math.floor(diffMs / month));
    return `${months} Month${months > 1 ? 's' : ''} ago`;
  }
  const days = Math.max(1, Math.floor(diffMs / day));
  return `${days} Day${days > 1 ? 's' : ''} ago`;
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [pdfPage, setPdfPage] = useState(1);
  const [totalPdfPages, setTotalPdfPages] = useState<number | null>(null);
  const [pdfRotation, setPdfRotation] = useState(0);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [hasPdfError, setHasPdfError] = useState(false);
  const [isPdfMenuOpen, setIsPdfMenuOpen] = useState(false);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const pdfFrameRef = useRef<HTMLDivElement | null>(null);
  const pdfViewportRef = useRef<HTMLDivElement | null>(null);
  const pdfCanvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
  const pdfDocRef = useRef<any>(null);
  const pdfRenderTaskRef = useRef<any[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<any>(null);
  const videoFrameRef = useRef<HTMLDivElement | null>(null);
  const videoSettingsRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isVideoSettingsOpen, setIsVideoSettingsOpen] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const rawPreviewContentUrl = searchParams?.get('contentUrl') ?? null;
  const previewContentUrl = useMemo(
    () => normalizePreviewUrl(rawPreviewContentUrl),
    [rawPreviewContentUrl]
  );
  const previewContentTypeParam = searchParams?.get('contentType') ?? null;
  const previewContentLabel = searchParams?.get('contentLabel') ?? null;
  const previewContentType = resolveContentType(previewContentTypeParam ?? '', previewContentUrl ?? '');

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await getProductById(params.id, 'NGN');
        if (!isMounted) return;
        setProduct(response);
        setHasError(false);
      } catch {
        if (!isMounted) return;
        setProduct(null);
        setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const courseSections = useMemo<CourseSection[]>(() => {
    try {
      const builtSections: CourseSection[] = [];

      const ensureSection = (name?: string, fallback = 'Content') => {
        const normalized = normalizeSectionName(name, fallback);
        let section = builtSections.find((entry) => entry.name === normalized);
        if (section) return section;
        section = {
          id: `section-${builtSections.length + 1}-${normalized}`,
          label: `${String(builtSections.length + 1).padStart(2, '0')} ${normalized}`,
          name: normalized,
          items: []
        };
        builtSections.push(section);
        return section;
      };

      if (Array.isArray(product?.sections)) {
        product.sections.forEach((section, sectionIndex) => {
          const targetSection = ensureSection(section.name, `Section ${sectionIndex + 1}`);
          if (!Array.isArray(section.contents)) return;

          section.contents.forEach((entry, itemIndex) => {
            const fileData = entry.fileData ?? entry.file_data;
            const fileRecord = fileData as Record<string, unknown> | undefined;
            const hlsUrl = firstValidUrl(
              fileData?.m3u8,
              readOptionalString(fileRecord, 'm3u8Url'),
              readOptionalString(fileRecord, 'm3u8_url'),
              readOptionalString(fileRecord, 'hls')
            );
            const fallbackVideoUrl = firstValidUrl(
              fileData?.mp4,
              fileData?.original,
              isUrl(entry.body) ? entry.body : undefined
            );
            const url = pickPreferredContentUrl({
              rawType: fileData?.type ?? entry.type,
              fileOriginal: fileData?.original,
              fileMp4: fileData?.mp4,
              fileM3u8: hlsUrl,
              bodyUrl: isUrl(entry.body) ? entry.body : undefined
            });

            if (!url) return;

            const type = resolveContentType(fileData?.type ?? entry.type, url);
            const title =
              trimToNonEmptyString(entry.title) ||
              pathTail(fileData?.key) ||
              `Content ${itemIndex + 1}`;
            const description =
              typeof entry.body === 'string' && !isUrl(entry.body)
                ? entry.body.trim()
                : undefined;
            const metaPieces: string[] = [type];
            const status = trimToNonEmptyString(fileData?.status);
            if (status) metaPieces.push(status);

            targetSection.items.push({
              id: `${targetSection.id}-item-${itemIndex + 1}-${title}`,
              title,
              url,
              hlsUrl,
              fallbackVideoUrl,
              type,
              description,
              meta: metaPieces.join(' • '),
              sectionId: targetSection.id
            });
          });
        });
      }

      if (
        builtSections.every((entry) => entry.items.length === 0) &&
        Array.isArray(product?.contents)
      ) {
        const targetSection = ensureSection('Content');
        product.contents.forEach((item, itemIndex) => {
          if (!item) return;
          if (typeof item === 'string') {
            const type = resolveContentType(undefined, item);
            targetSection.items.push({
              id: `${targetSection.id}-item-${itemIndex + 1}`,
              title: `Content ${itemIndex + 1}`,
              url: item,
              type,
              meta: type,
              sectionId: targetSection.id
            });
            return;
          }

          const maybeObject = item as {
            original?: string;
            type?: string;
            key?: string;
            status?: string;
            body?: string;
            title?: string;
            fileData?: {
              original?: string;
              mp4?: string;
              m3u8?: string;
              type?: string;
              key?: string;
              status?: string;
            };
            file_data?: {
              original?: string;
              mp4?: string;
              m3u8?: string;
              type?: string;
              key?: string;
              status?: string;
            };
          };

          const nestedFile = maybeObject.fileData ?? maybeObject.file_data;
          const nestedFileRecord = nestedFile as Record<string, unknown> | undefined;
          const maybeRecord = maybeObject as Record<string, unknown>;
          const hlsUrl = firstValidUrl(
            nestedFile?.m3u8,
            readOptionalString(maybeRecord, 'm3u8'),
            readOptionalString(maybeRecord, 'm3u8Url'),
            readOptionalString(maybeRecord, 'm3u8_url'),
            readOptionalString(nestedFileRecord, 'm3u8Url'),
            readOptionalString(nestedFileRecord, 'm3u8_url'),
            readOptionalString(nestedFileRecord, 'hls')
          );
          const fallbackVideoUrl = firstValidUrl(
            nestedFile?.mp4,
            nestedFile?.original,
            maybeObject.original,
            isUrl(maybeObject.body) ? maybeObject.body : undefined
          );
          const url = pickPreferredContentUrl({
            rawType: maybeObject.type ?? nestedFile?.type,
            topLevelOriginal: maybeObject.original,
            fileOriginal: nestedFile?.original,
            fileMp4: nestedFile?.mp4,
            fileM3u8: hlsUrl,
            bodyUrl: isUrl(maybeObject.body) ? maybeObject.body : undefined
          });

          if (!url) return;

          const type = resolveContentType(maybeObject.type ?? nestedFile?.type, url);
          const title =
            trimToNonEmptyString(maybeObject.title) ||
            pathTail(maybeObject.key) ||
            pathTail(nestedFile?.key) ||
            `Content ${itemIndex + 1}`;
          const description =
            typeof maybeObject.body === 'string' && !isUrl(maybeObject.body)
              ? maybeObject.body.trim()
              : undefined;
          const status = trimToNonEmptyString(maybeObject.status ?? nestedFile?.status);
          const metaPieces: string[] = [type];
          if (status) metaPieces.push(status);

          targetSection.items.push({
            id: `${targetSection.id}-item-${itemIndex + 1}-${title}`,
            title,
            url,
            hlsUrl,
            fallbackVideoUrl,
            type,
            description,
            meta: metaPieces.join(' • '),
            sectionId: targetSection.id
          });
        });
      }

      if (
        builtSections.every((entry) => entry.items.length === 0) &&
        Array.isArray(product?.product_media)
      ) {
        const targetSection = ensureSection('Media');
        product.product_media.forEach((mediaValue, itemIndex) => {
          const mediaUrl = normalizePreviewUrl(trimToNonEmptyString(mediaValue) ?? null);
          if (!mediaUrl) return;
          const type = resolveContentType(undefined, mediaUrl);
          targetSection.items.push({
            id: `${targetSection.id}-item-${itemIndex + 1}`,
            title: `Media ${itemIndex + 1}`,
            url: mediaUrl,
            type,
            meta: type,
            sectionId: targetSection.id
          });
        });
      }

      if (previewContentUrl) {
        const comparablePreviewUrl = normalizeUrlForComparison(previewContentUrl);
        const alreadyPresent = builtSections.some((section) =>
          section.items.some(
            (item) =>
              normalizeUrlForComparison(item.url) === comparablePreviewUrl
          )
        );
        if (!alreadyPresent) {
          const targetSection = ensureSection('Content');
          targetSection.items.unshift({
            id: `${targetSection.id}-preview`,
            title: previewContentLabel ?? 'Selected Content',
            url: previewContentUrl,
            type: previewContentType,
            meta: previewContentType,
            sectionId: targetSection.id
          });
        }
      }

      return builtSections.filter((entry) => entry.items.length > 0);
    } catch (error) {
      console.error('Failed to build course content sections', error);
      if (!previewContentUrl) {
        return [];
      }
      return [
        {
          id: 'section-1-Content',
          label: '01 Content',
          name: 'Content',
          items: [
            {
              id: 'section-1-Content-preview',
              title: previewContentLabel ?? 'Selected Content',
              url: previewContentUrl,
              type: previewContentType,
              meta: previewContentType,
              sectionId: 'section-1-Content'
            }
          ]
        }
      ];
    }
  }, [previewContentLabel, previewContentType, previewContentUrl, product]);

  useEffect(() => {
    if (courseSections.length === 0) {
      setSelectedItemId(null);
      setExpandedSectionId(null);
      return;
    }

    const allItems = courseSections.flatMap((section) => section.items);
    const comparablePreviewUrl = normalizeUrlForComparison(previewContentUrl);
    const byUrl = previewContentUrl
      ? allItems.find(
          (item) =>
            normalizeUrlForComparison(item.url) === comparablePreviewUrl
        )
      : undefined;
    const byLabel =
      !byUrl && previewContentLabel
        ? allItems.find(
            (item) => item.title.toLowerCase() === previewContentLabel.toLowerCase()
          )
        : undefined;
    const preferred = byUrl ?? byLabel ?? allItems[0];
    if (!preferred) {
      setSelectedItemId(null);
      setExpandedSectionId(null);
      return;
    }

    setSelectedItemId((current) => {
      if (current && allItems.some((item) => item.id === current) && !previewContentUrl) {
        return current;
      }
      return preferred.id;
    });

    setExpandedSectionId((current) => {
      if (preferred.sectionId) {
        return preferred.sectionId;
      }
      if (current && courseSections.some((section) => section.id === current)) {
        return current;
      }
      return courseSections[0].id;
    });
  }, [courseSections, previewContentLabel, previewContentUrl]);

  const selectedItem = useMemo(() => {
    for (const section of courseSections) {
      const found = section.items.find((item) => item.id === selectedItemId);
      if (found) return found;
    }
    return null;
  }, [courseSections, selectedItemId]);

  const firstProductMediaUrl =
    Array.isArray(product?.product_media)
      ? product.product_media
          .map((mediaValue) => normalizePreviewUrl(trimToNonEmptyString(mediaValue) ?? null))
          .find((mediaUrl): mediaUrl is string => Boolean(mediaUrl)) ?? null
      : null;

  const viewerUrl =
    selectedItem?.url ??
    previewContentUrl ??
    firstProductMediaUrl ??
    null;

  const viewerType =
    selectedItem?.type ??
    (viewerUrl ? resolveContentType(previewContentTypeParam ?? '', viewerUrl) : previewContentType);
  const viewerVideoUrl =
    viewerType === 'Video'
      ? (selectedItem?.hlsUrl && isM3u8Url(selectedItem.hlsUrl)
          ? selectedItem.hlsUrl
          : selectedItem?.fallbackVideoUrl ?? viewerUrl)
      : null;
  const viewerVideoFallbackUrl =
    viewerType === 'Video'
      ? selectedItem?.fallbackVideoUrl
      : null;
  const productName = trimToNonEmptyString(product?.product_name);
  const contentTitle =
    selectedItem?.title ??
    previewContentLabel ??
    productName ??
    'Course Content';

  const productDescription = stripHtml(product?.product_description);
  const contentDescription =
    selectedItem?.description ??
    (productDescription || 'No description available.');
  const normalizedPageTitle = (productName ?? '').toLowerCase();
  const normalizedContentTitle = contentTitle.trim().toLowerCase();
  const shouldShowContentHeading =
    Boolean(selectedItem) || normalizedContentTitle !== normalizedPageTitle;

  const rawComments = (product as unknown as {
    comments?: Array<{ name?: string; avatar?: string; text?: string; createdAt?: string }>;
  })?.comments;

  const comments =
    Array.isArray(rawComments) && rawComments.length > 0
      ? rawComments
      : [];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setDuration(video.duration || 0);
    const onTime = () => setCurrentTime(video.currentTime || 0);
    const onPlay = () => {
      setIsPlaying(true);
      setVideoError(null);
    };
    const onPause = () => setIsPlaying(false);
    const onVolume = () => setIsMuted(video.muted);

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolume);

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolume);
    };
  }, [viewerVideoUrl, viewerUrl, viewerType]);

  useEffect(() => {
    if (viewerType !== 'Video') return;
    setVideoError(null);
    setIsVideoSettingsOpen(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 1;
  }, [viewerType, viewerVideoUrl]);

  useEffect(() => {
    let isCancelled = false;
    const video = videoRef.current;
    if (!video || viewerType !== 'Video' || !viewerVideoUrl) return;

    const cleanupHls = () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {
          // no-op
        }
        hlsRef.current = null;
      }
    };

    cleanupHls();
    setVideoError(null);

    const tryFallbackSource = () => {
      if (
        !viewerVideoFallbackUrl ||
        viewerVideoFallbackUrl === viewerVideoUrl ||
        isM3u8Url(viewerVideoFallbackUrl)
      ) {
        return false;
      }
      cleanupHls();
      video.src = viewerVideoFallbackUrl;
      video.load();
      setVideoError(null);
      return true;
    };

    const isHlsUrl = isM3u8Url(viewerVideoUrl);
    if (!isHlsUrl) {
      video.src = viewerVideoUrl;
      video.load();
      return () => {
        cleanupHls();
      };
    }

    const setupHls = async () => {
      try {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = viewerVideoUrl;
          video.load();
          return;
        }

        const { default: Hls } = await import('hls.js');
        if (isCancelled) return;
        if (!Hls.isSupported()) {
          if (!tryFallbackSource()) {
            setVideoError('This stream format is not supported in this browser.');
          }
          return;
        }

        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(viewerVideoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_event: any, data: any) => {
          if (data?.fatal && !isCancelled) {
            if (!tryFallbackSource()) {
              setVideoError('Unable to load this video stream.');
            }
          }
        });
      } catch {
        if (!isCancelled) {
          if (!tryFallbackSource()) {
            setVideoError('Unable to load this video stream.');
          }
        }
      }
    };

    void setupHls();

    return () => {
      isCancelled = true;
      cleanupHls();
    };
  }, [viewerType, viewerVideoFallbackUrl, viewerVideoUrl]);

  useEffect(() => {
    if (!isVideoSettingsOpen) return;
    const close = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!videoSettingsRef.current?.contains(target)) {
        setIsVideoSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, [isVideoSettingsOpen]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setVideoError(null);
      void video.play().catch((error: unknown) => {
        const errorName =
          typeof error === 'object' && error && 'name' in error
            ? String((error as { name?: string }).name)
            : '';

        // Ignore transient promise rejections caused by rapid source/seek updates.
        if (errorName === 'AbortError') return;

        if (errorName === 'NotSupportedError') {
          setVideoError('This video format is not supported in this browser.');
          return;
        }

        setVideoError('Unable to play this video.');
      });
    } else {
      video.pause();
    }
  };

  const seekRelative = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const next = Math.max(0, Math.min((video.duration || 0), video.currentTime + seconds));
    video.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const cyclePlaybackRate = () => {
    const video = videoRef.current;
    if (!video) return;
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.findIndex((rate) => Math.abs(rate - playbackRate) < 0.01);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const setVideoPlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleVideoFullscreen = async () => {
    const container = videoFrameRef.current;
    if (!container) return;
    if (document.fullscreenElement && document.fullscreenElement.contains(container)) {
      await document.exitFullscreen();
      return;
    }
    try {
      await container.requestFullscreen();
    } catch {
      // no-op
    }
  };

  const cancelPdfRenderTasks = () => {
    pdfRenderTaskRef.current.forEach((task) => {
      try {
        task.cancel();
      } catch {
        // no-op
      }
    });
    pdfRenderTaskRef.current = [];
  };

  const scrollToPdfPage = (pageNumber: number) => {
    const container = pdfViewportRef.current;
    const canvas = pdfCanvasRefs.current[pageNumber];
    if (!container || !canvas) return;
    container.scrollTo({
      top: Math.max(canvas.offsetTop - 16, 0),
      behavior: 'smooth'
    });
  };

  const handlePdfZoomOut = () => setPdfZoom((value) => Math.max(50, value - 10));
  const handlePdfZoomIn = () => setPdfZoom((value) => Math.min(200, value + 10));
  const handlePdfPrevPage = () => {
    const nextPage = Math.max(1, pdfPage - 1);
    setPdfPage(nextPage);
    scrollToPdfPage(nextPage);
  };
  const handlePdfNextPage = () => {
    const nextPage = totalPdfPages ? Math.min(totalPdfPages, pdfPage + 1) : pdfPage + 1;
    setPdfPage(nextPage);
    scrollToPdfPage(nextPage);
  };
  const handlePdfResetView = () => {
    setPdfZoom(100);
    setPdfPage(1);
    setPdfRotation(0);
  };

  const handlePdfFullscreen = async () => {
    const container = pdfFrameRef.current;
    if (!container) return;
    if (document.fullscreenElement && document.fullscreenElement.contains(container)) {
      await document.exitFullscreen();
      return;
    }
    try {
      await container.requestFullscreen();
    } catch {
      // no-op
    }
  };

  const handlePdfDownload = async () => {
    if (!viewerUrl || typeof document === 'undefined' || typeof window === 'undefined') return;
    try {
      const response = await fetch(viewerUrl);
      if (!response.ok) throw new Error('Failed to fetch file');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = `${contentTitle || 'document'}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(viewerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePdfPrint = async () => {
    if (!viewerUrl || typeof document === 'undefined' || typeof window === 'undefined') return;
    try {
      const response = await fetch(viewerUrl);
      if (!response.ok) throw new Error('Failed to fetch file');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const frame = document.createElement('iframe');
      frame.style.position = 'fixed';
      frame.style.width = '0';
      frame.style.height = '0';
      frame.style.border = '0';
      frame.src = blobUrl;
      document.body.appendChild(frame);

      frame.onload = () => {
        frame.contentWindow?.focus();
        frame.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(frame);
          window.URL.revokeObjectURL(blobUrl);
        }, 1000);
      };
    } catch {
      window.open(viewerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePdfRotate = () => {
    setPdfRotation((value) => (value + 90) % 360);
  };

  const handlePdfFitWidth = async () => {
    const doc = pdfDocRef.current;
    const container = pdfViewportRef.current;
    if (!doc || !container) return;
    const page = await doc.getPage(Math.max(1, Math.min(pdfPage, doc.numPages)));
    const viewport = page.getViewport({ scale: 1, rotation: pdfRotation });
    const targetWidth = Math.max(container.clientWidth - 32, 200);
    const nextZoom = Math.round((targetWidth / viewport.width) * 100);
    setPdfZoom(Math.max(50, Math.min(200, nextZoom)));
  };

  useEffect(() => {
    // Reset per-document view state whenever content changes.
    setPdfZoom(100);
    setPdfPage(1);
    setTotalPdfPages(null);
    setPdfRotation(0);
    setIsPdfMenuOpen(false);
    pdfCanvasRefs.current = {};
    const viewport = pdfViewportRef.current;
    if (viewport) viewport.scrollTop = 0;
  }, [viewerUrl, viewerType]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const current = document.fullscreenElement;
      const pdfFrame = pdfFrameRef.current;
      const videoFrame = videoFrameRef.current;
      setIsPdfFullscreen(Boolean(pdfFrame && current && (current === pdfFrame || current.contains(pdfFrame))));
      setIsVideoFullscreen(
        Boolean(videoFrame && current && (current === videoFrame || current.contains(videoFrame)))
      );
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const loadPdf = async () => {
      if (viewerType !== 'Reading' || !viewerUrl) {
        cancelPdfRenderTasks();
        if (pdfDocRef.current) {
          try {
            await pdfDocRef.current.destroy();
          } catch {
            // no-op
          }
        }
        pdfDocRef.current = null;
        setTotalPdfPages(null);
        setHasPdfError(false);
        return;
      }

      setIsPdfLoading(true);
      setHasPdfError(false);
      try {
        cancelPdfRenderTasks();
        if (pdfDocRef.current) {
          try {
            await pdfDocRef.current.destroy();
          } catch {
            // no-op
          }
        }
        const pdfjs = await import('pdfjs-dist');
        const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
        pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
        const loadingTask = pdfjs.getDocument({ url: viewerUrl });
        const doc = await loadingTask.promise;
        if (isCancelled) {
          await doc.destroy();
          return;
        }
        pdfDocRef.current = doc;
        setTotalPdfPages(doc.numPages || null);
        setPdfPage((value) => Math.max(1, Math.min(value, doc.numPages || 1)));
      } catch {
        if (!isCancelled) {
          pdfDocRef.current = null;
          setTotalPdfPages(null);
          setHasPdfError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsPdfLoading(false);
        }
      }
    };

    void loadPdf();
    return () => {
      isCancelled = true;
      cancelPdfRenderTasks();
    };
  }, [viewerType, viewerUrl]);

  useEffect(() => {
    let isCancelled = false;
    const renderPdf = async () => {
      if (viewerType !== 'Reading') return;
      const doc = pdfDocRef.current;
      if (!doc || !totalPdfPages) return;

      const safePage = Math.max(1, Math.min(pdfPage, doc.numPages || 1));
      if (safePage !== pdfPage) {
        setPdfPage(safePage);
        return;
      }

      setIsPdfLoading(true);
      try {
        cancelPdfRenderTasks();
        const tasks: any[] = [];
        for (let pageNumber = 1; pageNumber <= totalPdfPages; pageNumber += 1) {
          if (isCancelled) break;
          const canvas = pdfCanvasRefs.current[pageNumber];
          if (!canvas) continue;

          const page = await doc.getPage(pageNumber);
          const viewport = page.getViewport({
            scale: Math.max(0.5, pdfZoom / 100),
            rotation: pdfRotation
          });
          const context = canvas.getContext('2d');
          if (!context) continue;

          const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          context.setTransform(dpr, 0, 0, dpr, 0, 0);

          const renderTask = page.render({
            canvasContext: context,
            viewport
          });
          tasks.push(renderTask);
          await renderTask.promise;
        }
        pdfRenderTaskRef.current = tasks;
      } catch (error: any) {
        if (!isCancelled && error?.name !== 'RenderingCancelledException') {
          setHasPdfError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsPdfLoading(false);
        }
      }
    };

    void renderPdf();
    return () => {
      isCancelled = true;
      cancelPdfRenderTasks();
    };
  }, [viewerType, pdfPage, pdfZoom, pdfRotation, totalPdfPages]);

  useEffect(() => {
    if (viewerType !== 'Reading') return;
    const container = pdfViewportRef.current;
    if (!container || !totalPdfPages) return;

    const updateCurrentPageFromScroll = () => {
      const top = container.getBoundingClientRect().top;
      let bestPage = pdfPage;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let pageNumber = 1; pageNumber <= totalPdfPages; pageNumber += 1) {
        const canvas = pdfCanvasRefs.current[pageNumber];
        if (!canvas) continue;
        const distance = Math.abs(canvas.getBoundingClientRect().top - top - 16);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestPage = pageNumber;
        }
      }

      setPdfPage((current) => (current === bestPage ? current : bestPage));
    };

    container.addEventListener('scroll', updateCurrentPageFromScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', updateCurrentPageFromScroll);
    };
  }, [viewerType, totalPdfPages, pdfPage]);

  return (
    <PageContainer className="gap-6">
      {hasError && (
        <div className="w-full rounded-md border border-border-danger bg-red-50 text-text-danger px-3 py-2 text-sm">
          Unable to load product. Please try again.
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 px-2 py-1.5 w-[88px] h-[29px] bg-surface-secondary rounded-md hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-text-primary" />
        <span className="font-sans text-body-md tracking-[-0.01em] text-text-primary">
          Go back
        </span>
      </button>

      <TwoPaneLayout
        mainMin="1fr"
        sideWidth="clamp(280px,24vw,420px)"
        gap="clamp(0.75rem,1.5vw,1.5rem)"
      >
        <div className="flex flex-col gap-6 w-full">
          <h1 className="font-sans text-heading-lg-bold text-text-primary line-clamp-2 h-6">
            {productName ?? 'Course Content'}
          </h1>

          <div className="flex flex-col gap-4 w-full">
            {viewerType === 'Reading' ? (
              <MediaFrame
                ref={pdfFrameRef}
                minHeight="460px"
                defaultHeight="min(56vw,72vh)"
                maxHeight="86vh"
                aspectRatio="auto"
                className="bg-[#525659] flex flex-col fullscreen:h-screen fullscreen:rounded-none"
              >
                <div className="h-[56px] bg-[#323639] shadow-viewer-header px-4 flex items-center justify-between relative">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center px-6 gap-2 h-6">
                      <button
                        type="button"
                        onClick={handlePdfPrevPage}
                        className="text-white disabled:opacity-40"
                        disabled={pdfPage <= 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="w-6 h-6 bg-[#191B1C] flex items-center justify-center">
                        <span className="text-[12px] leading-[15px] font-medium text-white">
                          {pdfPage}
                        </span>
                      </div>
                      <span className="text-[14px] leading-[17px] font-medium text-white">
                        /
                      </span>
                      <span className="text-[14px] leading-[17px] font-medium text-white">
                        {totalPdfPages ?? '--'}
                      </span>
                      <button
                        type="button"
                        onClick={handlePdfNextPage}
                        className="text-white disabled:opacity-40"
                        disabled={Boolean(totalPdfPages && pdfPage >= totalPdfPages)}
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-px h-6 bg-[#BDBDC7]" />
                    <div className="flex items-center px-6 gap-4 h-6">
                      <button type="button" onClick={handlePdfZoomOut} className="text-white">
                        <Minus className="w-6 h-6" />
                      </button>
                      <div className="h-6 min-w-[51px] px-2 bg-[#191B1C] flex items-center justify-center">
                        <span className="text-[12px] leading-[15px] font-medium text-white">
                          {pdfZoom}%
                        </span>
                      </div>
                      <button type="button" onClick={handlePdfZoomIn} className="text-white">
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="w-px h-6 bg-[#BDBDC7]" />
                    <div className="flex items-center px-6 gap-4 h-6">
                      <button
                        type="button"
                        onClick={handlePdfFullscreen}
                        className="text-white"
                        aria-label={isPdfFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                        title={isPdfFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      >
                        {isPdfFullscreen ? (
                          <Minimize className="w-6 h-6" />
                        ) : (
                          <Maximize className="w-6 h-6" />
                        )}
                      </button>
                      <button type="button" onClick={handlePdfRotate} className="text-white">
                        <ResetViewIcon />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => void handlePdfDownload()} className="text-white">
                      <DownloadIcon />
                    </button>
                    <button type="button" onClick={() => void handlePdfPrint()} className="text-white">
                      <PrintIcon />
                    </button>
                    <button
                      type="button"
                      className="text-white"
                      aria-label="More options"
                      onClick={() => setIsPdfMenuOpen((value) => !value)}
                    >
                      <DotsVerticalIcon />
                    </button>
                    {isPdfMenuOpen && (
                      <div className="absolute top-[56px] right-4 z-30 w-40 bg-white rounded-lg border border-border-primary shadow-dropdown overflow-hidden">
                        <button
                          type="button"
                          onClick={async () => {
                            setIsPdfMenuOpen(false);
                            await handlePdfFitWidth();
                          }}
                          className="w-full text-left px-3 py-2 text-body-sm text-text-primary hover:bg-surface-secondary"
                        >
                          Fit to width
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPdfMenuOpen(false);
                            handlePdfResetView();
                          }}
                          className="w-full text-left px-3 py-2 text-body-sm text-text-primary hover:bg-surface-secondary"
                        >
                          Reset view
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPdfMenuOpen(false);
                            if (viewerUrl) window.open(viewerUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="w-full text-left px-3 py-2 text-body-sm text-text-primary hover:bg-surface-secondary"
                        >
                          Open original
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  ref={pdfViewportRef}
                  className="flex-1 overflow-auto relative"
                >
                  {!viewerUrl ? (
                    <ContentViewer type="Reading" />
                  ) : hasPdfError ? (
                    <div className="text-white text-body-sm">Unable to render PDF.</div>
                  ) : (
                    <div className="min-h-full w-full p-4 flex flex-col items-center gap-4">
                      {Array.from({ length: totalPdfPages ?? 0 }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                          <canvas
                            key={`pdf-page-${pageNumber}`}
                            ref={(node) => {
                              pdfCanvasRefs.current[pageNumber] = node;
                            }}
                            data-page={pageNumber}
                            className="bg-white shadow-md max-w-none shrink-0"
                            aria-label={`${contentTitle} page ${pageNumber}`}
                          />
                        );
                      })}
                    </div>
                  )}
                  {isPdfLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-body-sm">
                      Rendering...
                    </div>
                  )}
                </div>
              </MediaFrame>
            ) : viewerType === 'Video' ? (
              <MediaFrame
                ref={videoFrameRef}
                minHeight="360px"
                defaultHeight="min(42vw,66vh)"
                maxHeight="78vh"
                aspectRatio="16 / 9"
                className="bg-black relative flex flex-col justify-end fullscreen:h-screen fullscreen:rounded-none"
              >
                {viewerVideoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-contain"
                      playsInline
                      onClick={togglePlayback}
                      onError={() => setVideoError('Unable to load this video.')}
                    />
                    {videoError && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 text-white text-sm px-4 text-center">
                        {videoError}
                      </div>
                    )}
                    <div className="relative z-10 h-[54px] bg-black/50 backdrop-blur-[5px] px-4 flex items-center justify-between">
                      <div className="w-[214px] h-[22px] flex items-center gap-4">
                        <button type="button" onClick={togglePlayback} className="text-white">
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <VideoPlayIcon />
                          )}
                        </button>
                        <button type="button" onClick={toggleMute} className="text-white">
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <VideoVolumeHighIcon />
                          )}
                        </button>
                        <button type="button" onClick={() => seekRelative(-10)} className="text-white">
                          <VideoBack10Icon />
                        </button>
                        <span className="text-white text-[14px] leading-[22px] font-medium min-w-[70px]">
                          {formatTime(currentTime)}/{formatTime(duration || 180)}
                        </span>
                        <button type="button" onClick={() => seekRelative(10)} className="text-white">
                          <VideoForward10Icon />
                        </button>
                      </div>
                      <div ref={videoSettingsRef} className="h-[22px] flex items-center gap-4 relative">
                        <button
                          type="button"
                          className="text-white"
                          aria-label={isVideoFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                          title={isVideoFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                          onClick={() => void handleVideoFullscreen()}
                        >
                          {isVideoFullscreen ? (
                            <Minimize className="w-5 h-5" />
                          ) : (
                            <Maximize className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          type="button"
                          className="text-white text-[14px] leading-[22px] font-medium"
                          onClick={cyclePlaybackRate}
                        >
                          {playbackRate}x
                        </button>
                        <button
                          type="button"
                          className="text-white"
                          aria-label="Player settings"
                          onClick={() => setIsVideoSettingsOpen((value) => !value)}
                        >
                          <VideoSettingsIcon />
                        </button>
                        {isVideoSettingsOpen && (
                          <div className="absolute bottom-9 right-0 w-44 rounded-lg border border-[#EAECF0] bg-white shadow-dropdown overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                void handleVideoFullscreen();
                                setIsVideoSettingsOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-[13px] leading-4 text-[#2B2834] hover:bg-[#F9F9FB]"
                            >
                              {isVideoFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                            </button>
                            {[1, 1.25, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                type="button"
                                onClick={() => {
                                  setVideoPlaybackRate(rate);
                                  setIsVideoSettingsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-[13px] leading-4 hover:bg-[#F9F9FB] ${
                                  Math.abs(playbackRate - rate) < 0.01
                                    ? 'text-[#5F2EFC]'
                                    : 'text-[#2B2834]'
                                }`}
                              >
                                Speed {rate}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <ContentViewer type="Video" />
                )}
              </MediaFrame>
            ) : (
              <MediaFrame
                minHeight="360px"
                defaultHeight="min(42vw,66vh)"
                maxHeight="78vh"
                aspectRatio="16 / 9"
                className="bg-[#F9F9FB] border border-[#EBEBEB] flex items-center justify-center"
              >
                {viewerUrl ? (
                  <img
                    src={viewerUrl}
                    alt={contentTitle}
                    className="w-full h-full object-contain bg-white"
                  />
                ) : (
                  <ContentViewer type="Reading" />
                )}
              </MediaFrame>
            )}

          <div className="flex flex-col gap-[14px]">
              {shouldShowContentHeading && (
                <h2 className="font-sans text-body-lg text-[#1F1F1F] line-clamp-1">
                  {contentTitle}
                </h2>
              )}
              <p className="font-sans text-body-sm-regular text-[#4B4B4B] max-w-[423px]">
                {contentDescription}
              </p>
            </div>

            <div className="w-full h-px bg-border-primary" />

            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-body-lg text-[#1F1F1F]">Comments</h3>
              <div className="w-full border border-border-primary rounded p-4 bg-white flex flex-col gap-4">
                {comments.length === 0 && (
                  <span className="font-sans text-body-sm-regular text-text-secondary">
                    No comments available for this content yet.
                  </span>
                )}
                {comments.map((comment, index) => (
                  <div
                    key={`${comment.name ?? 'comment'}-${index}`}
                    className={`w-full flex items-start gap-2 pb-4 ${
                      index !== comments.length - 1 ? 'border-b border-border-primary' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-[200px] bg-surface-secondary overflow-hidden shrink-0">
                      {comment.avatar ? (
                        <img
                          src={comment.avatar}
                          alt={comment.name ?? 'User'}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 flex flex-col gap-[6px]">
                      <div className="w-full flex items-center gap-2">
                        <span className="flex-1 font-sans text-body-sm text-[#1F1F1F]">
                          {comment.name ?? 'Anonymous'}
                        </span>
                        <span className="font-sans text-caption-sm-regular text-text-tertiary">
                          {getRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <span className="font-sans text-body-sm-regular text-text-secondary">
                        {comment.text ?? 'No comment text.'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full self-stretch flex flex-col gap-6">
          <h2 className="w-full h-6 font-sans text-[16px] leading-[19px] font-medium text-[#5F5971]">
            Course Content
          </h2>

          <div className="box-border w-full h-[clamp(32rem,72vh,50rem)] border border-[#EBEBEB] rounded-[8px] bg-white px-4 pt-4 pb-2 overflow-auto">
            {isLoading && courseSections.length === 0 && (
              <span className="font-sans text-body-sm-regular text-text-secondary">
                Loading content...
              </span>
            )}
            {!isLoading && courseSections.length === 0 && (
              <span className="font-sans text-body-sm-regular text-text-secondary">
                No content available.
              </span>
            )}

            {courseSections.map((section, sectionIndex) => {
              const isExpanded = expandedSectionId === section.id;
              return (
                <div
                  key={section.id}
                  className={`w-full ${sectionIndex !== courseSections.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}
                >
                  <button
                    onClick={() =>
                      setExpandedSectionId((current) =>
                        current === section.id ? null : section.id
                      )
                    }
                    className="w-full h-[39px] py-[10px] flex items-center justify-between gap-2"
                  >
                    <span className="font-sans text-[16px] leading-[19px] font-medium text-[#2B2834]">
                      {section.label}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-text-secondary" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-text-secondary" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 mb-3 flex flex-col gap-1">
                      {section.items.map((item) => {
                        const isActive = selectedItem?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelectedItemId(item.id)}
                            className={`w-full h-[52px] rounded-[8px] border px-3 py-[10px] flex items-center gap-2 text-left transition-colors ${
                              isActive
                                ? 'bg-[#F3F0FF] border-transparent'
                                : 'bg-white border-[#EAECF0] hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-[8px] bg-[#5838FC] flex items-center justify-center shrink-0">
                              {item.type === 'Video' ? (
                                <PlayCircle className="w-4 h-4 text-white" />
                              ) : (
                                <BookOpen className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div
                                className={`font-sans text-[14px] leading-[17px] font-medium line-clamp-1 ${
                                  isActive ? 'text-[#5F2EFC]' : 'text-[#2B2834]'
                                }`}
                              >
                                {item.title}
                              </div>
                              <div
                                className={`font-sans text-[11px] leading-[13px] font-normal line-clamp-1 ${
                                  isActive ? 'text-[#5F2EFC]' : 'text-[#A5A1AF]'
                                }`}
                              >
                                {item.meta}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </TwoPaneLayout>
    </PageContainer>
  );
}
