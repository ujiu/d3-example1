import './style.css'
import * as d3 from 'd3'

const svg = d3
  .select('#app')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400)
  .style('border', '1px solid black')
  .style('cursor', 'pointer')

let begin = true
svg.on('click', e => {
  const svgEl: SVGSVGElement = e.target.viewportElement ? e.target.viewportElement : e.target

  if (begin) {
    svgEl.pauseAnimations()
  } else {
    svgEl.unpauseAnimations()
  }
  begin = !begin
})

// accompany circle
const unitAngle = (Math.PI * 2) / 3
const angles = Array.from({ length: 3 }).map((_, index) => unitAngle * index - Math.PI / 2)
const g1 = svg.append('g').attr('transform', 'translate(200, 200)')
const g2 = g1.append('g')

g2.append('animateTransform')
  .attr('attributeName', 'transform')
  .attr('begin', '0s')
  .attr('dur', '10s')
  .attr('type', 'rotate')
  .attr('from', '0')
  .attr('to', '360')
  .attr('repeatCount', 'indefinite')

g2.selectAll('circle')
  .data(angles)
  .enter()
  .append('circle')
  .attr('r', 25)
  .attr('cx', d => 100 * Math.cos(d))
  .attr('cy', d => 100 * Math.sin(d))
  .attr('fill', '#ccc')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)

// center circle
svg
  .append('circle')
  .attr('r', 25)
  .attr('cx', 200)
  .attr('cy', 200)
  .attr('fill', 'transparent')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)

// track
svg
  .append('circle')
  .attr('r', 100)
  .attr('cx', 200)
  .attr('cy', 200)
  .attr('fill', 'transparent')
  .attr('stroke', 'grey')
  .attr('stroke-dasharray', 5)
