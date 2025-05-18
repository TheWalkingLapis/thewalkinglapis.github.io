/** onclick callback that resets the pathname to keep the relative location when refreshing the page
 * 
 * @param {String} tag - name of section
 */
function onClickTopNav(tag) {
    window.location="#"+tag
    // reset location hash
    history.replaceState(null, document.title, window.location.pathname + window.location.search);
}