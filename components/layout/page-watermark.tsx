/**
 * Bangladesh line-art in the side gutters, flush with the content
 * column — no gap, no overlap. Hidden on small screens, in high
 * contrast, and from assistive tech.
 */
function PageWatermark() {
  return (
    <div className="page-watermark" aria-hidden="true">
      <div className="page-watermark-side page-watermark-left" />
      <div className="page-watermark-side page-watermark-right" />
    </div>
  );
}

export { PageWatermark };
