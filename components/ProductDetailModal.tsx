'use client';

import { ArrowUpRight, BookOpen, MoreHorizontal, PlayCircle, X } from 'lucide-react';
import { Product } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    getProductReviews,
    getProductById,
    type ProductReviewItem,
    type ProductReviewsResponse,
    type ProductDetailResponse
} from '@/lib/api';

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
}

const StarIcon = ({ filled = true, className = "" }: { filled?: boolean; className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M3.8269 10.6668C3.90023 10.3402 3.7669 9.8735 3.53356 9.64016L1.91356 8.02016C1.4069 7.5135 1.2069 6.9735 1.35356 6.50683C1.5069 6.04016 1.98023 5.72016 2.6869 5.60016L4.7669 5.2535C5.0669 5.20016 5.43356 4.9335 5.57356 4.66016L6.72023 2.36016C7.05356 1.70016 7.5069 1.3335 8.00023 1.3335C8.49356 1.3335 8.9469 1.70016 9.28023 2.36016L10.4269 4.66016C10.5136 4.8335 10.6936 5.00016 10.8869 5.1135L3.7069 12.2935C3.61356 12.3868 3.45356 12.3002 3.48023 12.1668L3.8269 10.6668Z" fill={filled ? "#FF8D28" : "#F1F1F1"} />
        <path d="M12.4667 9.63977C12.2267 9.87977 12.0934 10.3398 12.1734 10.6664L12.6334 12.6731C12.8267 13.5064 12.7067 14.1331 12.2934 14.4331C12.1267 14.5531 11.9267 14.6131 11.6934 14.6131C11.3534 14.6131 10.9534 14.4864 10.5134 14.2264L8.56003 13.0664C8.25337 12.8864 7.7467 12.8864 7.44003 13.0664L5.4867 14.2264C4.7467 14.6598 4.11337 14.7331 3.7067 14.4331C3.55337 14.3198 3.44003 14.1664 3.3667 13.9664L11.4734 5.85977C11.78 5.5531 12.2134 5.4131 12.6334 5.48644L13.3067 5.59977C14.0134 5.71977 14.4867 6.03977 14.64 6.50644C14.7867 6.9731 14.5867 7.5131 14.08 8.01977L12.4667 9.63977Z" fill={filled ? "#FF8D28" : "#F1F1F1"} />
    </svg>
);

const SmallStarIcon = ({ filled = true }: { filled?: boolean }) => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.8269 10.6668C3.90023 10.3402 3.7669 9.8735 3.53356 9.64016L1.91356 8.02016C1.4069 7.5135 1.2069 6.9735 1.35356 6.50683C1.5069 6.04016 1.98023 5.72016 2.6869 5.60016L4.7669 5.2535C5.0669 5.20016 5.43356 4.9335 5.57356 4.66016L6.72023 2.36016C7.05356 1.70016 7.5069 1.3335 8.00023 1.3335C8.49356 1.3335 8.9469 1.70016 9.28023 2.36016L10.4269 4.66016C10.5136 4.8335 10.6936 5.00016 10.8869 5.1135L3.7069 12.2935C3.61356 12.3868 3.45356 12.3002 3.48023 12.1668L3.8269 10.6668Z" fill={filled ? "#DBD8E4" : "#DBD8E4"} />
        <path d="M12.4667 9.63977C12.2267 9.87977 12.0934 10.3398 12.1734 10.6664L12.6334 12.6731C12.8267 13.5064 12.7067 14.1331 12.2934 14.4331C12.1267 14.5531 11.9267 14.6131 11.6934 14.6131C11.3534 14.6131 10.9534 14.4864 10.5134 14.2264L8.56003 13.0664C8.25337 12.8864 7.7467 12.8864 7.44003 13.0664L5.4867 14.2264C4.7467 14.6598 4.11337 14.7331 3.7067 14.4331C3.55337 14.3198 3.44003 14.1664 3.3667 13.9664L11.4734 5.85977C11.78 5.5531 12.2134 5.4131 12.6334 5.48644L13.3067 5.59977C14.0134 5.71977 14.4867 6.03977 14.64 6.50644C14.7867 6.9731 14.5867 7.5131 14.08 8.01977L12.4667 9.63977Z" fill={filled ? "#DBD8E4" : "#DBD8E4"} />
    </svg>
);

const formatDate = (value?: string) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

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

const toBooleanFlag = (value: unknown) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'active';
    }
    return false;
};

const stripHtml = (value?: string) => {
    if (!value) return '';
    return value
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const isUrl = (value?: string) =>
    typeof value === 'string' && /^https?:\/\//i.test(value.trim());

const detectContentKind = (rawType?: string, url?: string) => {
    const type = (rawType ?? '').toLowerCase();
    const normalizedUrl = (url ?? '').toLowerCase();
    if (type.includes('image') || /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif)(\?|$)/i.test(normalizedUrl)) {
        return 'Image';
    }
    if (type.includes('video') || normalizedUrl.endsWith('.mp4') || normalizedUrl.endsWith('.m3u8')) {
        return 'Video';
    }
    return 'Reading';
};

const firstValidUrl = (...values: Array<string | undefined>) =>
    values.find((value) => isUrl(value));

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
    const hintedType = detectContentKind(
        rawType,
        firstValidUrl(fileM3u8, fileMp4, fileOriginal, topLevelOriginal, bodyUrl)
    );
    if (hintedType === 'Video') {
        return firstValidUrl(fileM3u8, fileMp4, fileOriginal, topLevelOriginal, bodyUrl);
    }
    return firstValidUrl(topLevelOriginal, fileOriginal, fileMp4, fileM3u8, bodyUrl);
};

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const [reviews, setReviews] = useState<ProductReviewItem[]>([]);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [distribution, setDistribution] = useState<Record<number, number>>({});
    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [isReviewsLoading, setIsReviewsLoading] = useState(false);
    const [hasReviewsError, setHasReviewsError] = useState(false);
    const [productDetail, setProductDetail] = useState<ProductDetailResponse | null>(null);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [hasProductError, setHasProductError] = useState(false);
    const [openContentMenuId, setOpenContentMenuId] = useState<string | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const isObjectId = (value?: string | null) => Boolean(value && /^[0-9a-fA-F]{24}$/.test(value));
    const productRecord = product as unknown as Record<string, unknown> | null;
    const detailId =
        typeof productRecord?.detailId === 'string' && productRecord.detailId.length > 0
            ? productRecord.detailId
            : product?.id;
    const rowHasEmbeddedContent =
        (Array.isArray(productRecord?.contents) && productRecord.contents.length > 0) ||
        (Array.isArray(productRecord?.sections) && productRecord.sections.length > 0);

    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);

    useEffect(() => {
        if (!productRecord) {
            setProductDetail(null);
            setHasProductError(false);
            setIsProductLoading(false);
            return;
        }

        const hasInlineDetailShape =
            typeof productRecord.product_name === 'string' ||
            typeof productRecord.product_description === 'string' ||
            typeof productRecord.product_cover === 'string' ||
            rowHasEmbeddedContent;

        if (hasInlineDetailShape) {
            setProductDetail(productRecord as unknown as ProductDetailResponse);
        } else {
            setProductDetail(null);
        }

        if (!detailId || !isObjectId(detailId)) {
            setHasProductError(false);
            setIsProductLoading(false);
            return;
        }

        let isMounted = true;
        const fetchProduct = async () => {
            setIsProductLoading(true);
            try {
                const response = await getProductById(detailId, 'NGN');
                if (!isMounted) return;
                setProductDetail((previous) => ({
                    ...(previous ?? {}),
                    ...response
                }));
                setHasProductError(false);
            } catch {
                if (!isMounted) return;
                setHasProductError(true);
            } finally {
                if (isMounted) {
                    setIsProductLoading(false);
                }
            }
        };

        fetchProduct();

        return () => {
            isMounted = false;
        };
    }, [detailId, product, rowHasEmbeddedContent]);

    useEffect(() => {
        setOpenContentMenuId(null);
    }, [activeTab, detailId]);

    useEffect(() => {
        setIsDescriptionExpanded(false);
    }, [detailId, product?.id, productDetail?.product_description]);

    useEffect(() => {
        if (!detailId || !isObjectId(detailId)) {
            setReviews([]);
            setAverageRating(null);
            setDistribution({});
            setTotalReviews(0);
            setHasReviewsError(false);
            return;
        }

        let isMounted = true;
        const fetchReviews = async () => {
            setIsReviewsLoading(true);
            try {
                const response: ProductReviewsResponse = await getProductReviews({
                    product: detailId,
                    page: 1,
                    limit: 5
                });
                if (!isMounted) return;

                setReviews(response.items ?? []);
                setAverageRating(response.averageRating ?? null);
                const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                Object.entries(response.distribution ?? {}).forEach(([key, value]) => {
                    const n = Number(key);
                    if (dist[n as 1 | 2 | 3 | 4 | 5] !== undefined) {
                        dist[n as 1 | 2 | 3 | 4 | 5] = Number(value ?? 0);
                    }
                });
                setDistribution(dist);
                setTotalReviews(response.pagination?.total ?? response.items?.length ?? 0);
                setHasReviewsError(false);
            } catch {
                if (!isMounted) return;
                setReviews([]);
                setAverageRating(null);
                setDistribution({});
                setTotalReviews(0);
                setHasReviewsError(true);
            } finally {
                if (isMounted) setIsReviewsLoading(false);
            }
        };

        fetchReviews();

        return () => {
            isMounted = false;
        };
    }, [detailId]);

    if (!product) return null;
    const fallbackSource = {
        contents: Array.isArray(productRecord?.contents) ? productRecord.contents : undefined,
        sections: Array.isArray(productRecord?.sections) ? productRecord.sections : undefined
    };
    const sourceForContent = {
        ...(fallbackSource as Record<string, unknown>),
        ...((productDetail ?? {}) as Record<string, unknown>)
    } as ProductDetailResponse;

    const contentSections = (() => {
        type ParsedContentItem = {
            id: string;
            url: string;
            type: string;
            label: string;
            status: string;
            section: string;
        };

        const sectionOrder: string[] = [];
        const sectionDescriptionByName = new Map<string, string>();
        const sectionItems = new Map<string, ParsedContentItem[]>();
        const seen = new Set<string>();

        const normalizeSectionName = (value?: string, fallback = 'Content') => {
            if (typeof value !== 'string') return fallback;
            const trimmed = value.trim();
            return trimmed.length > 0 ? trimmed : fallback;
        };

        const registerSection = (name?: string, description?: string, fallback = 'Content') => {
            const normalizedName = normalizeSectionName(name, fallback);
            if (!sectionOrder.includes(normalizedName)) {
                sectionOrder.push(normalizedName);
            }
            if (
                typeof description === 'string' &&
                description.trim().length > 0 &&
                !sectionDescriptionByName.has(normalizedName)
            ) {
                sectionDescriptionByName.set(normalizedName, description.trim());
            }
            if (!sectionItems.has(normalizedName)) {
                sectionItems.set(normalizedName, []);
            }
            return normalizedName;
        };

        const addItem = (payload: {
            url?: string;
            type?: string;
            key?: string;
            status?: string;
            label?: string;
            section?: string;
            sectionDescription?: string;
        }) => {
            if (!payload.url) return;
            if (seen.has(payload.url)) return;
            seen.add(payload.url);
            const sectionName = registerSection(payload.section, payload.sectionDescription);
            const sectionBucket = sectionItems.get(sectionName);
            if (!sectionBucket) return;
            sectionBucket.push({
                id: `${payload.key ?? payload.url}`,
                url: payload.url,
                type: payload.type ?? 'unknown',
                label: payload.label ?? payload.key?.split('/').pop() ?? 'Content',
                status: payload.status ?? '',
                section: sectionName
            });
        };

        if (Array.isArray(sourceForContent?.sections)) {
            sourceForContent.sections.forEach((section, sectionIdx) => {
                const sectionWithMeta = section as {
                    name?: string;
                    description?: string;
                    contents?: Array<{
                        title?: string;
                        type?: string;
                        body?: string;
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
                    }>;
                };
                const sectionName = registerSection(
                    sectionWithMeta.name,
                    sectionWithMeta.description,
                    `Section ${sectionIdx + 1}`
                );
                if (!Array.isArray(section.contents)) return;
                section.contents.forEach((entry, entryIdx) => {
                    const fileData = entry.fileData ?? entry.file_data;
                    const preferredUrl = pickPreferredContentUrl({
                        rawType: fileData?.type ?? entry.type,
                        fileOriginal: fileData?.original,
                        fileMp4: fileData?.mp4,
                        fileM3u8: fileData?.m3u8,
                        bodyUrl: isUrl(entry.body) ? entry.body : undefined
                    });
                    const sectionDescription =
                        typeof entry.body === 'string' && !isUrl(entry.body)
                            ? entry.body.trim()
                            : undefined;
                    if (!preferredUrl) return;
                    addItem({
                        url: preferredUrl,
                        type: fileData?.type ?? entry.type,
                        key: fileData?.key,
                        status: fileData?.status,
                        label: entry.title ?? fileData?.key?.split('/').pop() ?? `Content ${entryIdx + 1}`,
                        section: sectionName,
                        sectionDescription
                    });
                });
            });
        }

        if (Array.isArray(sourceForContent?.contents)) {
            const defaultSectionName = sectionOrder.length > 0 ? 'Additional Content' : 'Content';
            registerSection(defaultSectionName);
            sourceForContent.contents.forEach((item, idx) => {
                if (!item) return;
                if (typeof item === 'string') {
                    addItem({
                        url: item,
                        label: `Content ${idx + 1}`,
                        section: defaultSectionName
                    });
                    return;
                }
                const unknownItem = item as {
                    original?: string;
                    type?: string;
                    key?: string;
                    status?: string;
                    body?: string;
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
                const nestedFileData = unknownItem.fileData ?? unknownItem.file_data;
                const preferredUrl = pickPreferredContentUrl({
                    rawType: unknownItem.type ?? nestedFileData?.type,
                    topLevelOriginal: unknownItem.original,
                    fileOriginal: nestedFileData?.original,
                    fileMp4: nestedFileData?.mp4,
                    fileM3u8: nestedFileData?.m3u8,
                    bodyUrl: isUrl(unknownItem.body) ? unknownItem.body : undefined
                });
                const sectionDescription =
                    typeof unknownItem.body === 'string' && !isUrl(unknownItem.body)
                        ? unknownItem.body.trim()
                        : undefined;
                addItem({
                    url: preferredUrl,
                    type: unknownItem.type ?? nestedFileData?.type,
                    key: unknownItem.key ?? nestedFileData?.key,
                    status: unknownItem.status ?? nestedFileData?.status,
                    label:
                        (unknownItem.key ?? nestedFileData?.key)?.split('/').pop() ??
                        `Content ${idx + 1}`,
                    section: defaultSectionName,
                    sectionDescription
                });
            });
        }

        if ([...sectionItems.values()].every((entries) => entries.length === 0)) {
            const mediaSection = sectionOrder.length > 0 ? 'Media' : 'Content';
            registerSection(mediaSection);
            ((sourceForContent?.product_media ?? []) as unknown[])
                .filter((url): url is string => typeof url === 'string' && url.length > 0)
                .forEach((url, idx) => {
                    addItem({
                        url,
                        type: 'media',
                        label: `Media ${idx + 1}`,
                        section: mediaSection
                    });
                });
        }

        return sectionOrder
            .map((sectionName, sectionIdx) => {
                const items = sectionItems.get(sectionName) ?? [];
                return {
                    id: `${sectionName}-${sectionIdx}`,
                    title: sectionName,
                    heading: `${String(sectionIdx + 1).padStart(2, '0')} ${sectionName}`,
                    description: sectionDescriptionByName.get(sectionName) ?? '',
                    items
                };
            })
            .filter((section) => section.items.length > 0);
    })();

    const getContentKind = (type: string, url: string) => {
        const normalizedType = (type || '').toLowerCase();
        const normalizedUrl = (url || '').toLowerCase();
        if (
            normalizedType.includes('image') ||
            /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif)(\?|$)/i.test(normalizedUrl)
        ) {
            return 'Image';
        }
        if (
            normalizedType.includes('video') ||
            normalizedUrl.endsWith('.mp4') ||
            normalizedUrl.endsWith('.m3u8')
        ) {
            return 'Video';
        }
        return 'Reading';
    };

    const getContentMeta = (item: {
        type: string;
        status: string;
        section?: string;
    }) => {
        const kind = getContentKind(item.type, '');
        const parts = [kind];
        if (item.status) parts.push(item.status);
        return parts.join(' • ');
    };

    const openContentInApp = (item: { url: string; type: string; label: string }) => {
        const targetId =
            (typeof detailId === 'string' && detailId.length > 0 ? detailId : '') ||
            (typeof product.id === 'string' && product.id.length > 0 ? product.id : '');
        if (!targetId) {
            return;
        }
        const params = new URLSearchParams({
            contentUrl: item.url,
            contentType: getContentKind(item.type, item.url),
            contentLabel: item.label
        });
        setOpenContentMenuId(null);
        onClose();
        router.push(`/products/${encodeURIComponent(targetId)}?${params.toString()}`);
    };

    const handleViewCreatorProfile = () => {
        // Navigate to creator details page using the product's creatorId
        if (product?.creatorId) {
            router.push(`/creators/${product.creatorId}`);
            onClose();
        }
    };

    const modalComments = (
        ((productDetail as unknown as { comments?: Array<{ name?: string; avatar?: string; text?: string; createdAt?: string }> })?.comments) ??
        ((productRecord as { comments?: Array<{ name?: string; avatar?: string; text?: string; createdAt?: string }> | undefined })?.comments) ??
        []
    ).slice(0, 3);

    const isExclusiveAccessEnabled = toBooleanFlag(
        (productDetail as { exclusive_access?: unknown } | null)?.exclusive_access
    );
    const hasGroupChat = Boolean((productDetail as { group_Id?: string | null } | null)?.group_Id);
    const createdAtLabel = formatDate((productDetail as { createdAt?: string } | null)?.createdAt);
    const productCategoryLabel =
        (productDetail as { product_category?: string } | null)?.product_category ??
        product.type ??
        'Product';
    const productDescriptionText = stripHtml(productDetail?.product_description);
    const fullProductDescription = productDescriptionText || productDetail?.product_name || product.name;
    const maxDescriptionLength = 320;
    const shouldTruncateDescription = fullProductDescription.length > maxDescriptionLength;
    const visibleDescription =
        isDescriptionExpanded || !shouldTruncateDescription
            ? fullProductDescription
            : `${fullProductDescription.slice(0, maxDescriptionLength).trimEnd()}...`;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-[600px] bg-white z-50 flex flex-col shadow-2xl animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 h-[60px] border-b border-border-secondary">
                    <h2 className="font-sans text-heading-sm tracking-[-0.01em] text-text-primary">
                        Product Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 px-2 py-1.5 bg-surface-secondary rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-text-brand" />
                        <span className="font-sans text-caption-lg text-text-brand">
                            Close
                        </span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Product Info Section */}
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {/* Product Image */}
                        <div className="relative w-full h-[304px] rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
                            <img
                                src={productDetail?.product_cover || product.thumbnail}
                                alt={productDetail?.product_name || product.name}
                                className="w-full h-full object-cover"
                            />
                            {productDetail?.status && (
                                <div className="absolute top-3 left-3 z-20">
                                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-success rounded-[13px]">
                                        <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.5 6.5C0.5 7.28793 0.655194 8.06815 0.956723 8.7961C1.25825 9.52405 1.70021 10.1855 2.25736 10.7426C2.81451 11.2998 3.47595 11.7417 4.2039 12.0433C4.93185 12.3448 5.71207 12.5 6.5 12.5C7.28793 12.5 8.06815 12.3448 8.7961 12.0433C9.52405 11.7417 10.1855 11.2998 10.7426 10.7426C11.2998 10.1855 11.7417 9.52405 12.0433 8.7961C12.3448 8.06815 12.5 7.28793 12.5 6.5C12.5 5.71207 12.3448 4.93185 12.0433 4.2039C11.7417 3.47595 11.2998 2.81451 10.7426 2.25736C10.1855 1.70021 9.52405 1.25825 8.7961 0.956723C8.06815 0.655195 7.28793 0.5 6.5 0.5C5.71207 0.5 4.93185 0.655195 4.2039 0.956723C3.47595 1.25825 2.81451 1.70021 2.25736 2.25736C1.70021 2.81451 1.25825 3.47595 0.956723 4.2039C0.655194 4.93185 0.5 5.71207 0.5 6.5Z" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.5 6.50008L5.83333 7.83341L8.5 5.16675" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="font-sans font-medium text-[13px] leading-[16px] text-text-success">
                                            {productDetail.status}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-3">
                            {/* Title and Action */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="font-sans text-body-lg text-text-primary">
                                            {productDetail?.product_name ?? product.name}
                                        </h3>
                                        <span className="font-sans text-body-sm text-text-secondary">
                                            {productCategoryLabel}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-sans text-body-lg text-text-primary">
                                            {new Intl.NumberFormat('en-NG', {
                                                style: 'currency',
                                                currency: productDetail?.currency ?? 'NGN',
                                                minimumFractionDigits: 0
                                            }).format(productDetail?.product_price ?? product.price)}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <StarIcon filled={true} />
                                            <span className="font-sans text-body-lg text-text-primary">
                                                {(averageRating ?? productDetail?.averageRating ?? 0).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center px-4 py-2 h-[32px] bg-[#CD110A] rounded-lg border border-[rgba(251,236,235,0.2)] shadow-button-inset">
                                    <span className="font-sans text-body-sm text-white">
                                        Ban Product
                                    </span>
                                </button>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1">
                                <p className="font-sans text-body-sm-regular text-text-secondary">
                                    {visibleDescription}
                                </p>
                                {shouldTruncateDescription && (
                                    <button
                                        type="button"
                                        onClick={() => setIsDescriptionExpanded((value) => !value)}
                                        className="self-start font-sans text-caption-lg text-[#5F2EFC] underline"
                                    >
                                        {isDescriptionExpanded ? 'Show less' : 'Read more'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-[#EBEBEB]" />

                        {/* Creator Info */}
                        <div className="flex flex-col gap-2">
                            <span className="font-sans text-caption-sm-regular text-text-tertiary uppercase">
                                CREATOR
                            </span>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.creator?.name ? `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'}
                                    alt={product.creator?.name || 'Creator'}
                                    className="w-[34px] h-[35px] rounded-full object-cover"
                                />
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <span className="font-sans text-heading-sm text-text-primary">
                                        {product.creator?.name || 'Unknown Creator'}
                                    </span>
                                    <span className="font-sans text-caption-lg-regular text-text-tertiary">
                                        {product.creator?.username || '@creator'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleViewCreatorProfile}
                                    className="flex items-center justify-center px-4 py-2 h-[32px] bg-white border border-border-primary rounded-lg shadow-button-inset hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-sans text-body-sm text-[#353A44]">
                                        View profile
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center border-b border-border-primary">
                        {['Overview', 'Content', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 flex flex-col items-center pt-2.5 gap-3 h-[38px] font-sans text-body-sm transition-colors",
                                    activeTab === tab ? "text-text-primary" : "text-text-tertiary"
                                )}
                            >
                                <span>{tab}</span>
                                <div className={cn(
                                    "w-full h-0",
                                    activeTab === tab ? "border-b-2 border-border-brand" : "border-b border-border-primary"
                                )} />
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="px-6 pt-4 pb-6 bg-surface-secondary flex flex-col gap-4">
                        {activeTab === 'Overview' && (
                            <div className="w-full flex flex-col gap-4">
                                <div className="w-full flex flex-col gap-1 rounded-lg">
                                    <div className="h-8 bg-white border border-[#EBEBEB] rounded px-4 flex items-center gap-4">
                                        <span className="w-[105px] text-[12px] leading-[14px] font-normal text-[#5F5971]">
                                            Exclusive Access
                                        </span>
                                        <div className="w-px h-8 bg-[#EBEBEB]" />
                                        <span className="flex-1 text-[13.5px] leading-4 font-medium text-[#2B2834]">
                                            {isExclusiveAccessEnabled ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div className="h-8 bg-white border border-[#EBEBEB] rounded pl-4 pr-2 flex items-center gap-4">
                                        <span className="w-[105px] text-[12px] leading-[14px] font-normal text-[#5F5971]">
                                            Product Group Chat
                                        </span>
                                        <div className="w-px h-8 bg-[#EBEBEB]" />
                                        <span className="flex-1 text-[13.5px] leading-4 font-medium text-[#2B2834]">
                                            {hasGroupChat ? 'True' : 'False'}
                                        </span>
                                        {hasGroupChat && (
                                            <button
                                                type="button"
                                                className="flex items-center justify-end gap-1 flex-1 text-[12px] leading-[14px] font-medium text-[#5F2EFC] underline"
                                            >
                                                <span>View Group Chat</span>
                                                <ArrowUpRight className="w-[14px] h-[14px]" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="h-8 bg-white border border-[#EBEBEB] rounded px-4 flex items-center gap-4">
                                        <span className="w-[105px] text-[12px] leading-[14px] font-normal text-[#5F5971]">
                                            Date Created
                                        </span>
                                        <div className="w-px h-8 bg-[#EBEBEB]" />
                                        <span className="flex-1 text-[13.5px] leading-4 font-medium text-[#2B2834]">
                                            {createdAtLabel}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col gap-3">
                                    <h4 className="text-[16px] leading-[19px] font-bold text-[#1F1F1F]">Comments</h4>
                                    <div className="w-full bg-white border border-[#EBEBEB] rounded p-4 flex flex-col gap-4">
                                        {modalComments.length === 0 && (
                                            <span className="text-[13.5px] leading-4 font-normal text-[#5F5971]">
                                                No comments yet.
                                            </span>
                                        )}
                                        {modalComments.map((comment, index) => (
                                            <div
                                                key={`${comment.name ?? 'comment'}-${index}`}
                                                className={cn(
                                                    "w-full flex items-start gap-2 pb-4",
                                                    index !== modalComments.length - 1 && "border-b border-[#EBEBEB]"
                                                )}
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
                                                        <span className="flex-1 text-[13.5px] leading-4 font-medium text-[#1F1F1F]">
                                                            {comment.name ?? 'Anonymous'}
                                                        </span>
                                                        <span className="text-[10px] leading-3 font-normal text-[#A5A1AF]">
                                                            {getRelativeTime(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <span className="text-[13.5px] leading-4 font-normal text-[#5F5971]">
                                                        {comment.text ?? 'No comment text.'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Content' && (
                            <div className="flex flex-col gap-3" onClick={() => setOpenContentMenuId(null)}>
                                <div className="flex flex-col gap-4">
                                    {isProductLoading && (
                                        <span className="text-caption-sm text-text-secondary">Loading content…</span>
                                    )}
                                    {hasProductError && !isProductLoading && contentSections.length === 0 && (
                                        <span className="text-caption-sm text-text-secondary">Unable to load content.</span>
                                    )}
                                    {!isProductLoading && !hasProductError && contentSections.length === 0 && (
                                        <span className="text-caption-sm text-text-secondary">
                                            {isObjectId(detailId)
                                                ? 'No content returned by API. Access may be limited for this product.'
                                                : 'Product ID missing from listing response. Content cannot be loaded.'}
                                        </span>
                                    )}
                                    {!isProductLoading && contentSections.length > 0 && (
                                        <div className="flex flex-col gap-2">
                                            {contentSections.map((section) => (
                                                <div
                                                    key={section.id}
                                                    className="bg-white border border-border-primary rounded-[24px] p-4 flex flex-col gap-4 overflow-visible"
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        <h4 className="font-sans text-body-lg text-text-primary">
                                                            {section.heading}
                                                        </h4>
                                                        {section.description && (
                                                            <p className="font-sans text-body-sm-regular text-text-secondary">
                                                                {section.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-1 overflow-visible">
                                                        {section.items.map((item, itemIndex) => {
                                                            const isLastItem = itemIndex === section.items.length - 1;
                                                            const isMenuOpen = openContentMenuId === item.id;
                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    className="relative isolate flex items-center gap-2 px-3 py-2 h-[52px] bg-white border border-[#EAECF0] rounded-lg transition-colors cursor-pointer hover:bg-gray-50 overflow-visible"
                                                                    onClick={() => {
                                                                        openContentInApp(item);
                                                                    }}
                                                                >
                                                                    <div className="w-8 h-8 bg-[#5838FC] rounded-lg flex items-center justify-center flex-shrink-0">
                                                                        {getContentKind(item.type, item.url) === 'Video' ? (
                                                                            <PlayCircle className="w-4 h-4 text-white" />
                                                                        ) : (
                                                                            <BookOpen className="w-4 h-4 text-white" />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                                                        <span className="font-sans text-body-md text-text-primary line-clamp-1">
                                                                            {item.label}
                                                                        </span>
                                                                        <span className="font-sans text-caption-md text-text-tertiary line-clamp-1">
                                                                            {getContentMeta(item)}
                                                                        </span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(event) => {
                                                                            event.stopPropagation();
                                                                            setOpenContentMenuId(
                                                                                isMenuOpen ? null : item.id
                                                                            );
                                                                        }}
                                                                        className="w-5 h-5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                                                                    >
                                                                        <MoreHorizontal className="w-4 h-4" />
                                                                    </button>
                                                                    {isMenuOpen && (
                                                                        <div
                                                                            className={cn(
                                                                                "absolute right-2 z-30 w-32 bg-white border border-border-primary rounded-xl shadow-dropdown overflow-hidden",
                                                                                isLastItem ? "bottom-[42px]" : "top-[42px]"
                                                                            )}
                                                                            onClick={(event) => event.stopPropagation()}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    openContentInApp(item);
                                                                                }}
                                                                                className="w-full text-left px-4 py-2.5 text-body-sm text-text-primary hover:bg-surface-secondary transition-colors border-b border-border-primary"
                                                                            >
                                                                                View
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setOpenContentMenuId(null);
                                                                                }}
                                                                                className="w-full text-left px-4 py-2.5 text-body-sm text-text-danger hover:bg-surface-secondary transition-colors"
                                                                            >
                                                                                Reject Content
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Reviews' && (
                            <div className="flex flex-col gap-1 p-1">
                        {/* Rating Summary */}
                        <div className="flex items-center h-[100px] bg-white border border-border-primary rounded">
                            {/* Total Reviews */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-4 border-r border-border-primary">
                                <span className="font-sans text-caption-lg-regular text-text-secondary">
                                    Total Reviews
                                </span>
                                <span className="font-sans font-medium text-[20px] leading-[24px] tracking-[-0.01em] text-text-primary">
                                    {isReviewsLoading ? '—' : totalReviews.toLocaleString('en-NG')}
                                </span>
                            </div>

                            {/* Average Rating */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-4 border-r border-border-primary">
                                <span className="font-sans text-caption-lg-regular text-text-secondary">
                                    Average Rating
                                </span>
                                <div className="flex items-center gap-2.5">
                                    <span className="font-sans font-medium text-[20px] leading-[24px] tracking-[-0.01em] text-text-primary">
                                        {averageRating !== null ? averageRating.toFixed(1) : isReviewsLoading ? '—' : '0.0'}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <StarIcon key={i} filled={averageRating !== null && averageRating >= i} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Rating Distribution */}
                            <div className="flex-1 flex flex-col justify-center gap-2 py-4 px-4">
                                {[5, 4, 3, 2, 1].map((stars) => {
                                    const count = distribution[stars] ?? 0;
                                    const width =
                                        totalReviews > 0 ? `${Math.min((count / totalReviews) * 100, 100)}%` : '0%';
                                    return (
                                        <div key={stars} className="flex items-center gap-1.5">
                                            <div className="flex items-center gap-0.5 w-6">
                                                <SmallStarIcon filled={true} />
                                                <span className="font-sans text-caption-sm text-text-secondary flex-1 text-center">
                                                    {stars}
                                                </span>
                                            </div>
                                            <div className="flex-1 h-[4px] bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#FF8D28] rounded-full transition-all"
                                                    style={{ width }}
                                                />
                                            </div>
                                            <span className="font-sans text-caption-sm text-text-primary w-8 text-right">
                                                {count.toLocaleString('en-NG')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="flex flex-col bg-white border border-border-primary rounded">
                            {isReviewsLoading && (
                                <div className="p-4 text-caption-sm text-text-secondary">Loading reviews…</div>
                            )}
                            {hasReviewsError && !isReviewsLoading && (
                                <div className="p-4 text-caption-sm text-text-secondary">Unable to load reviews.</div>
                            )}
                            {!isReviewsLoading && !hasReviewsError && reviews.length === 0 && (
                                <div className="p-4 text-caption-sm text-text-secondary">No reviews yet.</div>
                            )}
                            {!isReviewsLoading && !hasReviewsError && reviews.map((review, index) => (
                                <div
                                    key={review._id}
                                    className={cn(
                                        "flex flex-col gap-2 p-4",
                                        index !== reviews.length - 1 && "border-b border-border-primary"
                                    )}
                                >
                                    {/* User Info */}
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={review.user_avatar}
                                            alt={review.user_name}
                                            className="w-[45px] h-[45px] rounded-full object-cover"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-sans font-bold text-[18px] leading-[22px] text-text-primary">
                                                {review.user_name}
                                            </span>
                                            <span className="font-sans text-heading-sm tracking-[-0.02em] text-[#8E8E8D]">
                                                {review.user_id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rating and Date */}
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    filled={i < review.rating}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-sans font-normal text-[14px] leading-[17px] tracking-[-0.02em] text-[#8E8E8D]">
                                            {new Date(review.createdAt).toLocaleDateString('en-NG')}
                                        </span>
                                    </div>

                                    {/* Review Text */}
                                    <p className="font-sans font-normal text-[16px] leading-[19px] text-[#090A07]">
                                        {review.review}
                                    </p>
                                </div>
                            ))}
                        </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
