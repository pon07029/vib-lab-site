import { site } from "../content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        {/* 상단 영역: 로고 + 랩 이름 및 주소 */}
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img
              src="/snu-logo.png"
              alt="SNU Logo"
              className="site-footer__logo"
            />
            <div className="site-footer__titles">
              <strong>SNU VIB LAB</strong>
              <span>Veterinary Informatics <i className="site-footer__cross">✕</i> Bioinformatics</span>
            </div>
          </div>

          <div className="site-footer__address">
            <p>College of Veterinary Medicine (Bldg 85), Seoul National University</p>
            <p>1 Gwanak-ro, Gwanak-gu, Seoul, Republic of Korea, 08826</p>
          </div>
        </div>

        {/* 연한 구분선 */}
        <div className="site-footer__divider" />

        {/* 하단 영역: 카피라이트 및 연락처 */}
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© 2026 SNU VIB LAB</p>
          <p className="site-footer__contact">
            <span>Tel: 02-880-1247</span>
            <span className="site-footer__sep">|</span>
            <span>Email: <a href={`mailto:${site.email}`}>{site.email}</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
